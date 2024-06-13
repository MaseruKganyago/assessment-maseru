using FluentMigrator;
using System;

namespace Maseru.Assesment.Migrations
{
	[Migration(20240613203700)]
	public class M20240613203700 : Migration
	{
		public override void Up()
		{
			Execute.Sql(@"CREATE or ALTER VIEW vw_getRANDValueBy26
AS
SELECT CAST(RAND() * 26 AS bigint) AS Value");
		}

		public override void Down()
		{
			throw new NotImplementedException();
		}
	}
}
