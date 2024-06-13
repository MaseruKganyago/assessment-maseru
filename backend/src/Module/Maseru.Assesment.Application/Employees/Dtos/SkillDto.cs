using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Maseru.Assesment.Domain.Employees;
using Maseru.Assesment.Domain.Enums;
using Maseru.Assesment.Domain.Skills;
using Shesha.AutoMapper.Dto;
using Shesha.Services.ReferenceLists.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Maseru.Assesment.Employees.Dtos
{
    [AutoMap(typeof(Skill))]
    public class SkillDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public long? YearsOfExperience { get; set; }
        public ReferenceListDto SkillLevel { get; set; }
        public EntityReferenceDto<Guid?> Employee { get; set; }
    }
}
