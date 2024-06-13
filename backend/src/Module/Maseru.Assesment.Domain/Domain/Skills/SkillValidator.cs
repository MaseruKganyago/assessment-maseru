using FluentValidation;

namespace Maseru.Assesment.Domain.Skills
{
	public class SkillValidator: AbstractValidator<Skill>
	{
		public SkillValidator()
		{
			RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required");
			RuleFor(x => x.Employee).NotNull().WithMessage("Employee is required");
		}
	}
}
