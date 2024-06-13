using Shesha.Domain.Attributes;

namespace Maseru.Assesment.Domain.Enums
{
	[ReferenceList("Assesment", "SkillLevel")]
	public enum RefListSkillLevel: long
	{
		Beginner = 1,
		Intermediate = 2,
		Expert = 3
	}
}
