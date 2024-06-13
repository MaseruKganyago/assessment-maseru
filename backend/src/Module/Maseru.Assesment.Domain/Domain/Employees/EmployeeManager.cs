using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.Runtime.Validation;
using Maseru.Assesment.Domain.Skills;
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

		/// <summary>
		/// 
		/// </summary>
		/// <param name="sessionProvider"></param>
		/// <param name="repository"></param>
		public EmployeeManager(ISessionProvider sessionProvider, IRepository<Employee, Guid> repository)
		{
			_sessionProvider = sessionProvider;
			_repository = repository;
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
		public async Task<Employee> CreateEmployee(Employee input, List<Skill> employeeSkills)
		{
			input.EmployeeId = GenerateEmployeeId();

			//Runs validation rules defined on the entity.
			var validationResults = new List<ValidationResult>();
			await this.FluentValidationsOnEntityAsync(input, validationResults);

			if (validationResults.Count != 0)
				throw new AbpValidationException("Please correct the errors on CreateEmployee and try again", validationResults);

			var entity = await this.SaveOrUpdateEntityAsync<Employee, Guid>(null, async item => 
			{
				ObjectMapper.Map(input, item);
			});

			await CreateUpdateEmployeeSkills(entity, employeeSkills);

			return entity;
		}

		/// <summary>
		/// Update employee, if employee skills are provided, then create/update them.
		/// </summary>
		/// <param name="input"></param>
		/// <param name="employeeSkills"></param>
		/// <returns></returns>
		/// <exception cref="AbpValidationException"></exception>
		public async Task<Employee> UpdateEmployee(Employee input, List<Skill> employeeSkills)
		{
			//Runs validation rules defined on the entity.
			var validationResults = new List<ValidationResult>();
			await this.FluentValidationsOnEntityAsync(input, validationResults);

			if (validationResults.Count != 0)
				throw new AbpValidationException("Please correct the errors on UpdateEmployee and try again", validationResults);

			var entity = await this.SaveOrUpdateEntityAsync<Employee, Guid>(input.Id, async item =>
			{
				ObjectMapper.Map(input, item);
			});

			await CreateUpdateEmployeeSkills(entity, employeeSkills);

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
		public async Task CreateUpdateEmployeeSkills(Employee employee, List<Skill> employeeSkills)
		{
			if (employeeSkills != null && employeeSkills.Count > 0)
			{
				foreach (var skill in employeeSkills)
				{
					skill.Employee = employee;

					//Runs validation rules defined on entity
					var validationResults = new List<ValidationResult>();
					await this.FluentValidationsOnEntityAsync(skill, validationResults);

					if (validationResults.Count != 0)
						throw new AbpValidationException("Please correct the errors on EmployeeSkills and try again", validationResults);

					//If skill.id is null, then is create operation else update operation
					await this.SaveOrUpdateEntityAsync<Skill, Guid>(skill.Id, async item =>
					{
						ObjectMapper.Map(skill, item);
					});
				}
			}
		}
	}
}
