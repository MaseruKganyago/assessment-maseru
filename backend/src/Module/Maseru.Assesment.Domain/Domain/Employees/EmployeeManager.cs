using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.Domain.Uow;
using Abp.Runtime.Validation;
using Maseru.Assesment.Domain.Skills;
using NHibernate;
using Shesha.Domain;
using Shesha.NHibernate;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace Maseru.Assesment.Domain.Employees
{
	/// <summary>
	/// DDD architecture approach: Domain Service(EmployeeManager) - implmenting core business logic
	/// at the employee level/aggregate root level
	/// </summary>
	public class EmployeeManager: DomainService
	{
		private readonly IRepository<Employee, Guid> _repository;
		private readonly ISessionProvider _sessionProvider;
		private readonly IUnitOfWorkManager _uowManager;

		/// <summary>
		/// 
		/// </summary>
		/// <param name="sessionProvider"></param>
		/// <param name="repository"></param>
		public EmployeeManager(IRepository<Employee, Guid> repository, ISessionProvider sessionProvider, IUnitOfWorkManager uowManager)
		{
			_repository = repository;
			_sessionProvider = sessionProvider;
			_uowManager = uowManager;
		}

		/// <summary>
		/// Exposes repository for CRUD operations, anywhere EmployeeManager is injected.
		/// </summary>
		public IRepository<Employee, Guid> Repository => _repository;

		/// <summary>
		/// Creates employee including employee skills.
		/// </summary>
		/// <param name="input"></param>
		/// <returns></returns>
		public async Task<Employee> CreateEmployeeAsync(Employee input, List<Skill> employeeSkills)
		{
			input.EmployeeId = GenerateEmployeeId();

			//Runs validation rules defined on the entity.
			var validationResults = new List<ValidationResult>();
			await this.FluentValidationsOnEntityAsync(input, validationResults);

			if (validationResults.Count != 0)
				throw new AbpValidationException("Please correct the errors on CreateEmployeeAsync and try again", validationResults);

			var entity = await this.SaveOrUpdateEntityAsync<Employee, Guid>(null, async item => 
			{
				ObjectMapper.Map(input, item);
			});
			
			var transaction = _sessionProvider.Session.GetCurrentTransaction();
			if (transaction != null)
				transaction.Commit();

			await CreateUpdateEmployeeSkills(entity.Id, employeeSkills);

			return entity;
		}

		/// <summary>
		/// Update employee, if employee skills are provided, then create/update them.
		/// </summary>
		/// <param name="input"></param>
		/// <param name="employeeSkills"></param>
		/// <returns></returns>
		/// <exception cref="AbpValidationException"></exception>
		public async Task<Employee> UpdateEmployeeAsync(Employee input, List<Skill> employeeSkills)
		{
			//Runs validation rules defined on the entity.
			var validationResults = new List<ValidationResult>();
			await this.FluentValidationsOnEntityAsync(input, validationResults);

			if (validationResults.Count != 0)
				throw new AbpValidationException("Please correct the errors on UpdateEmployeeAsync and try again", validationResults);

			var entity = await this.SaveOrUpdateEntityAsync<Employee, Guid>(input.Id, async item =>
			{
				input.EmployeeId = item.EmployeeId; //Retain the original employeeId
				ObjectMapper.Map(input, item);
			});

			var transaction = _sessionProvider.Session.GetCurrentTransaction();
			if (transaction != null)
				transaction.Commit();
			else 
			{
				//If transaction is null, then create a new transaction using UnitOfWorkManager.
				using (var uow = _uowManager.Begin())
				{
					var trandaction = _sessionProvider.Session.GetCurrentTransaction();
					transaction.Commit();

					await CreateUpdateEmployeeSkills(entity.Id, employeeSkills);
					uow.Complete();
				}
			}

			await CreateUpdateEmployeeSkills(entity.Id, employeeSkills);

			return entity;
		}

		/// <summary>
		/// Execute stored procedure to generate employee id
		/// </summary>
		/// <returns></returns>
		public string GenerateEmployeeId()
		{
			var session = _sessionProvider.Session;
			var employeeId = session.CreateSQLQuery("EXEC sp_Assesment_GenerateEmployeeId").UniqueResult<string>();
			return employeeId;
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="employee"></param>
		/// <param name="employeeSkills"></param>
		/// <returns></returns>
		/// <exception cref="AbpValidationException"></exception>
		public async Task CreateUpdateEmployeeSkills(Guid employeeId, List<Skill> employeeSkills)
		{
			if (employeeSkills != null && employeeSkills.Count > 0)
			{
				foreach (var skill in employeeSkills)
				{
					var Employee = await _repository.GetAsync(employeeId);

					if (string.IsNullOrEmpty(skill.Name) || Employee is null)
						throw new AbpValidationException("Skill Name and Employee are required.");

					Guid? skillId = Guid.Empty.Equals(skill.Id) ? null : skill.Id;

					//If skill.id is null, then is create operation else update operation
					await this.SaveOrUpdateEntityAsync<Skill, Guid>(skillId, async item =>
					{
						ObjectMapper.Map(skill, item);
						item.Employee = Employee;
					});
				}
			}
		}
	}
}
