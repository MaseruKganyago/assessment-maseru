using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;

namespace Maseru.Assesment.Domain.Employees
{
	/// <summary>
	/// 
	/// </summary>
    [AutoMap(typeof(Employee))]
	public class Employee : FullAuditedEntity<Guid>
    {
        [StringLength(6)]
        public string EmployeeId { get; set; }
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
        public virtual DateTime? DateOfBirth { get; set; }
        public virtual string Email { get; set; }
        public virtual string PhoneNumber { get; set; }

        #region Address information
        public virtual string Address { get; set; }
        public virtual string City { get; set; }
        public virtual long? PostalCode { get; set; }
        public virtual string Country { get; set; }
        #endregion
    }
}
