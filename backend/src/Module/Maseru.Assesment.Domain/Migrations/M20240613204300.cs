using FluentMigrator;
using System;

namespace Maseru.Assesment.Migrations
{
	[Migration(20240613204300)]
	public class M20240613204300 : Migration
	{
		public override void Up()
		{
			Execute.Sql(@"-- =============================================
-- StoredProc for generating EmployeeId, attempts
-- generating Id 3 times to reduce duplication.
-- =============================================
CREATE or ALTER PROCEDURE sp_Assesment_GenerateEmployeeId
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @Id uniqueidentifier = NULL;

	--1st Attempt
	DECLARE @RandomAlphabets nvarchar(2) = /*Gets two random Uppercase Alphabets */  [dbo].[fn_Assesment_TwoRandomAlphabets] ();
    DECLARE @RandomNumber int = /*Generates 4 random number of 9999 range */ CAST(RAND()*9999 as int);
	DECLARE @EmployeeId nvarchar(6) = @RandomAlphabets + CAST(@RandomNumber AS nvarchar(4));

	SELECT @Id = Id from Assesment_Employees where EmployeeId = @EmployeeId
	IF (@Id IS NULL)
		BEGIN
			SELECT @EmployeeId;
			RETURN;
		END;

	--2nd Attempt
	SET @RandomAlphabets = /*Gets two random Uppercase Alphabets */  [dbo].[fn_Assesment_TwoRandomAlphabets] ();
    SET @RandomNumber = /*Generates 4 random number of 9999 range */ CAST(RAND()*9999 as int);
	SET @EmployeeId = @RandomAlphabets + CAST(@RandomNumber AS nvarchar(4));
	SET @Id = NULL;

	SELECT @Id = Id from Assesment_Employees where EmployeeId = @EmployeeId
	IF (@Id IS NULL)
		BEGIN
			SELECT @EmployeeId;
			RETURN;
		END;

	--3rd Attempt
	SET @RandomAlphabets = /*Gets two random Uppercase Alphabets */  [dbo].[fn_Assesment_TwoRandomAlphabets] ();
    SET @RandomNumber = /*Generates 4 random number of 9999 range */ CAST(RAND()*9999 as int);
	SET @EmployeeId = @RandomAlphabets + CAST(@RandomNumber AS nvarchar(4));

	RETURN @EmployeeId;
END
GO");
		}

		public override void Down()
		{
			throw new NotImplementedException();
		}
	}
}
