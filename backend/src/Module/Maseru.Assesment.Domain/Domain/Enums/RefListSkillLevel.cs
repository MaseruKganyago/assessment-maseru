using Shesha.Domain.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
