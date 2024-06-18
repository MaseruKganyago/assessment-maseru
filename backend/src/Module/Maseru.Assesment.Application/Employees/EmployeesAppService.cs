using Abp.Authorization;
using Abp.Domain.Repositories;
using Maseru.Assesment.Domain.Employees;
using Maseru.Assesment.Domain.Skills;
using Maseru.Assesment.Employees.Dtos;
using Microsoft.AspNetCore.Mvc;
using NHibernate.Transform;
using Shesha;
using Shesha.NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Maseru.Assesment.Employees
{
	/// <summary>
	/// 
	/// </summary>
	[AbpAllowAnonymous]
	public class EmployeesAppService: SheshaAppServiceBase
	{
		private readonly EmployeeManager _employeeManager;
		private readonly IRepository<Skill, Guid> _skillRepo;
		private readonly ISessionProvider _sessionProvider;

		/// <summary>
		/// 
		/// </summary>
		/// <param name="employeeManager"></param>
		public EmployeesAppService(EmployeeManager employeeManager, IRepository<Skill, Guid> skillRepo, ISessionProvider sessionProvider)
		{
			_employeeManager = employeeManager;
			_skillRepo = skillRepo;
			_sessionProvider = sessionProvider;
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpGet]
		public async Task<EmployeeDto> Get(Guid id)
		{
			var employee = ObjectMapper.Map<EmployeeDto>(await _employeeManager.Repository.GetAsync(id));

			var skills = await _skillRepo.GetAllListAsync(a => a.Employee.Id == employee.Id);
			employee.Skills = skills.Select(s => ObjectMapper.Map<SkillDto>(s)).ToList();

			return employee;
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="searchFilters"></param>
		/// <returns></returns>
		[HttpGet]
		public async Task<List<EmployeeDto>> GetAll(SearchFilterDto searchFilters)
		{
			var sql = @"Exec sp_Assesment_EmployeesWithFilter @SearchString = :searchString, @DateOfBirth = :dateOfBirth,
				 @SkillName = :skillName, @SkillLevel = :skillLevel, @YearsOfExperience = :yearsOfExperience";

			return (await _sessionProvider.Session.CreateSQLQuery(sql)
							.SetParameter("searchString", searchFilters.SearchString)
							.SetParameter("skillName", searchFilters.SkillName)
							.SetParameter("skillLevel", searchFilters.SkillLevel)
							.SetParameter("yearsOfExperience", searchFilters.YearsOfExperience)
							.SetParameter("dateOfBirth", searchFilters.DateOfBirth)
							.SetResultTransformer(Transformers.AliasToBean<EmployeeDto>())
							.ListAsync<EmployeeDto>())
							.ToList();
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="input"></param>
		/// <returns></returns>
		[HttpPost]
		public async Task<EmployeeDto> Create(EmployeeDto input)
		{
			var skills = input.Skills.Select(s => ObjectMapper.Map<Skill>(s)).ToList();

			var employee = await _employeeManager.CreateEmployeeAsync(ObjectMapper.Map<Employee>(input), skills);

			return ObjectMapper.Map<EmployeeDto>(employee);
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="input"></param>
		/// <returns></returns>
		[HttpPut]
		public async Task<EmployeeDto> Update(EmployeeDto input)
		{
			var skills = input.Skills?.Select(s => ObjectMapper.Map<Skill>(s)).ToList();

			var employee = await _employeeManager.UpdateEmployeeAsync(ObjectMapper.Map<Employee>(input), skills);

			return ObjectMapper.Map<EmployeeDto>(employee);
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpDelete]
		public async Task Delete(Guid id)
		{
			await _employeeManager.Repository.DeleteAsync(id);
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpDelete]
		public async Task DeleteSkill(Guid id)
		{
			await _skillRepo.DeleteAsync(id);
		}
	}
}
