using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Maseru.Assesment.Employees.Dtos
{
	public class SearchFilterDto
	{
		public string SearchString { get; set; }
		public DateTime? DateOfBirth { get; set; }
		public string SkillName { get; set; }
		public long? SkillLevel { get; set; }
		public long? YearsOfExperience { get; set; }
	}
}
