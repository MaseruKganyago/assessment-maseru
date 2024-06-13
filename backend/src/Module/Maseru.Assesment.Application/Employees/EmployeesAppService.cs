using Abp.Domain.Repositories;
using Maseru.Assesment.Domain.Employees;
using Maseru.Assesment.Domain.Skills;
using Maseru.Assesment.Employees.Dtos;
using Microsoft.AspNetCore.Mvc;
using Shesha;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Maseru.Assesment.Employees
{
	public class EmployeesAppService: SheshaAppServiceBase
	{
		private readonly EmployeeManager _employeeManager;
		private readonly IRepository<Skill, Guid> _skillRepo;

		/// <summary>
		/// 
		/// </summary>
		/// <param name="employeeManager"></param>
		public EmployeesAppService(EmployeeManager employeeManager, IRepository<Skill, Guid> skillRepo)
		{
			_employeeManager = employeeManager;
			_skillRepo = skillRepo;
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
			var skills = input.Skills.Select(s => ObjectMapper.Map<Skill>(s)).ToList();

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
	}
}
