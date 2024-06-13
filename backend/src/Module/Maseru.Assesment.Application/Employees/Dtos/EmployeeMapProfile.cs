using Maseru.Assesment.Domain.Skills;
using Shesha.AutoMapper;
using Shesha.AutoMapper.Dto;
using System;

namespace Maseru.Assesment.Employees.Dtos
{
	/// <summary>
	/// Defines mapping profile for <see cref="Skill"/> to <see cref="SkillDto"/>
	/// </summary>
	public class EmployeeMapProfile: ShaProfile
	{
		public EmployeeMapProfile()
		{
			CreateMap<SkillDto, Skill>()
				.ForMember(dest => dest.Employee, opt => opt.Ignore())
				.MapReferenceListValuesFromDto();

			CreateMap<Skill, SkillDto>()
				.ForMember(dest => dest.Employee, opt => opt.MapFrom(src => src.Employee != null ? new EntityReferenceDto<Guid?>(src.Employee.Id, src.Employee.FullName, "") : null))
				.MapReferenceListValuesToDto();
		}
	}
}
