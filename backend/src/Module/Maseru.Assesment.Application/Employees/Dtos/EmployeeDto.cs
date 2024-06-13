using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Maseru.Assesment.Domain.Employees;
using System;
using System.Collections.Generic;

namespace Maseru.Assesment.Employees.Dtos
{
	[AutoMap(typeof(Employee))]
    public class EmployeeDto : EntityDto<Guid>
    {
        public string EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        #region Address information
        public string Address { get; set; }
        public string City { get; set; }
        public long? PostalCode { get; set; }
        public string Country { get; set; }
        #endregion

        public List<SkillDto> Skills { get; set; }
    }
}
