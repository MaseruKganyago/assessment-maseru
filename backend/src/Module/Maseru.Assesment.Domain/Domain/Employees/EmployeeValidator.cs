using FluentValidation;
using System.Text.RegularExpressions;

namespace Maseru.Assesment.Domain.Employees
{
	public class EmployeeValidator: AbstractValidator<Employee>
	{
		public EmployeeValidator()
		{
			RuleFor(x => x.FirstName).NotEmpty().WithMessage("FirstName is required");
			RuleFor(x => x.LastName).NotEmpty().WithMessage("LastName is required");
			RuleFor(x => x.EmployeeId).Custom((employeeId, context) =>
			{
				if (employeeId is null)
					context.AddFailure("EmployeeId is required");
				else
				{
					Regex regex = new(@"^[A-Z]{2}\d{4}$");
					if (!regex.IsMatch(employeeId))
						context.AddFailure("Invalid EmployeeId format. Must be in the format 'AA1234'");
				}
			});
		}
	}
}
