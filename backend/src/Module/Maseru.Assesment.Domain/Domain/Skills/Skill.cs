using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using Maseru.Assesment.Domain.Employees;
using Maseru.Assesment.Domain.Enums;
using System;

namespace Maseru.Assesment.Domain.Skills
{
    /// <summary>
    /// Represents an employee skill
    /// </summary>
    [AutoMap(typeof(Skill))]
    public class Skill : FullAuditedEntity<Guid>
    {
        public virtual string Name { get; set; }
        public virtual long? YearsOfExperience { get; set; }
        public virtual RefListSkillLevel? SkillLevel { get; set; }
        public virtual Employee Employee { get; set; }
    }
}
