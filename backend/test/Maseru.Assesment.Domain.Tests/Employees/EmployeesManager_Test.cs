using Maseru.Assesment.Domain.Employees;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Xunit;

namespace Maseru.Assesment.Tests.Employees
{
	public class EmployeesManager_Test: SheshaNhTestBase
	{
		private readonly EmployeeManager _employeeManager;

		public EmployeesManager_Test()
		{
			_employeeManager = Resolve<EmployeeManager>();
		}

		/// <summary>
		/// Note: Having an issue with Depencies, currently getting a runtime error of "System.TypeInitializationException
		/// : The type initializer for 'Shesha.Extensions.AssemblyExtensions' threw an exception.
		/// Castle.MicroKernel.ComponentNotFoundException : No component for supporting the service Abp.Reflection.ITypeFinder was found"
		/// </summary>
		[Fact]
		public void Should_Generate_Employee_Id()
		{
			//Prepare: Regex pattern for employee id
			Regex regex = new(@"^[A-Z]{2}\d{4}$");

			//Act: Generate employee id
			var employeeId = _employeeManager.GenerateEmployeeId();

			//Assert: Employee id should not be null or empty, and should be in the format "AA0000"
			employeeId.ShouldNotBeNullOrEmpty();
			regex.IsMatch(employeeId).ShouldBeTrue();
		}
	}
}
