using FluentMigrator;
using Shesha.FluentMigrator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Maseru.Assesment.Migrations
{
	[Migration(20240613203900)]
	public class M20240613203900 : Migration
	{
		public override void Up()
		{
			Execute.Sql(@"CREATE or ALTER FUNCTION fn_Assesment_TwoRandomAlphabets()
RETURNS NVARCHAR(2)
AS
BEGIN

DECLARE @Length INT = 2; -- Desired length: 2
DECLARE @CharPool VARCHAR(26) = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
DECLARE @LoopCount INT = 0;
DECLARE @RandomString VARCHAR(100) = '';

WHILE (@LoopCount < @Length)
BEGIN
    SELECT @RandomString = @RandomString + SUBSTRING(@CharPool, CONVERT(INT, (SELECT Value FROM vw_getRANDValueBy26)) + 1, 1);
    SELECT @LoopCount = @LoopCount + 1;
END

	RETURN @RandomString
END
GO");
		}

		public override void Down()
		{
			throw new NotImplementedException();
		}
	}
}
