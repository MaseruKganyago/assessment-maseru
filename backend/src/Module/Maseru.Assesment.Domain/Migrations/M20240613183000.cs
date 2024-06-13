using FluentMigrator;
using Shesha.FluentMigrator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Maseru.Assesment.Migrations
{
	[Migration(20240613183000)]
	public class M20240613183000 : Migration
	{
		public override void Up()
		{
			Create.Table("Assesment_Employees")
				.WithIdAsGuid()
				.WithFullAuditColumns()
				.WithColumn("EmployeeId").AsString(6).NotNullable()
				.WithColumn("FirstName").AsString().NotNullable()
				.WithColumn("LastName").AsString().NotNullable()
				.WithColumn("DateOfBirth").AsDateTime().Nullable()
				.WithColumn("Email").AsString().Nullable()
				.WithColumn("PhoneNumber").AsString().Nullable()
				.WithColumn("Address").AsString().Nullable()
				.WithColumn("City").AsString().Nullable()
				.WithColumn("PostalCode").AsInt64().Nullable()
				.WithColumn("Country").AsString().Nullable();

			Create.Table("Assesment_Skills")
				.WithIdAsGuid()
				.WithFullAuditColumns()
				.WithColumn("Name").AsString().NotNullable()
				.WithColumn("YearsOfExperience").AsInt64().Nullable()
				.WithColumn("SkillLevelLkp").AsInt64().Nullable()
				.WithForeignKeyColumn("EmployeeId", "Assesment_Employees");
		}

		public override void Down()
		{
			throw new NotImplementedException();
		}
	}
}
