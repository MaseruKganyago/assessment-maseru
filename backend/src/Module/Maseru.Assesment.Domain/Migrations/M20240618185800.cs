using FluentMigrator;
using System;

namespace Maseru.Assesment.Migrations
{
	[Migration(20240618185800)]
	public class M20240618185800 : Migration
	{
		public override void Up()
		{
			Execute.Sql(@"-- =============================================
-- Returns all employees if no filters, ordered by CreationTime Desc
-- =============================================
ALTER   PROCEDURE [dbo].[sp_Assesment_EmployeesWithFilter]
	@SearchString nvarchar(Max) = NULL, 
	@DateOfBirth datetime = NULL,
	@SkillName nvarchar(255) = NULL,
	@SkillLevel bigint = NULL,
	@YearsOfExperience bigint = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

DROP TABLE IF EXISTS #TempTable;
CREATE TABLE #TempTable (
Id uniqueidentifier,
EmployeeId nvarchar(6),
CreationTime datetime,
FirstName nvarchar(255),
LastName nvarchar(255),
PhoneNumber nvarchar(255),
Email nvarchar(255),
DateOfBirth datetime,
Address nvarchar(255),
City nvarchar(255),
PostalCode bigint,
Country nvarchar(255),
SkillName nvarchar(255),
SkillLevel bigint,
YearsOfExperience bigint
);

INSERT INTO #TempTable
SELECT
employees.Id,
employees.EmployeeId,
employees.CreationTime,
FirstName,
LastName,
PhoneNumber,
Email,
DateOfBirth,
Address,
City,
PostalCode,
Country,
skills.Name SkillName,
skills.SkillLevelLkp SkillLevel,
skills.YearsOfExperience YearsOfExperience
FROM Assesment_Employees employees
INNER JOIN Assesment_Skills skills ON skills.EmployeeId = employees.Id
WHERE employees.IsDeleted = 0
ORDER BY CreationTime desc

BEGIN
	IF (@SearchString IS NULL AND @DateOfBirth IS NULL AND @SkillName IS NULL AND @SkillLevel IS NULL AND @YearsOfExperience IS NULL)
		GOTO EmptySearch_Branch;
	IF (@SearchString IS NOT NULL AND @DateOfBirth IS NULL AND @SkillName IS NULL AND @SkillLevel IS NULL AND @YearsOfExperience IS NULL)
		GOTO GlobalSearch_Branch;
	IF (@SearchString IS NULL AND (@DateOfBirth IS NOT NULL OR @SkillName IS NOT NULL OR @SkillLevel IS NOT NULL OR @YearsOfExperience IS NOT NULL))
		GOTO FilterBySearch_Branch;
	IF (@SearchString IS NOT NULL AND (@DateOfBirth IS NOT NULL OR @SkillName IS NOT NULL OR @SkillLevel IS NOT NULL OR @YearsOfExperience IS NOT NULL))
		GOTO AllFitersSearch_Branch;
		END;

EmptySearch_Branch:
	BEGIN
	SELECT DISTINCT Id, EmployeeId, FirstName, LastName, PhoneNumber, Email, DateOfBirth, Address, City, PostalCode, Country FROM #TempTable;
	RETURN
	END;

GlobalSearch_Branch:
	BEGIN
	SELECT DISTINCT Id, EmployeeId, FirstName, LastName, PhoneNumber, Email, DateOfBirth, Address, City, PostalCode, Country FROM #TempTable
	WHERE FirstName LIKE CONCAT('%',@SearchString, '%')
	OR LastName LIKE CONCAT('%',@SearchString,'%')
	OR Email LIKE CONCAT('%',@SearchString,'%')

	RETURN;
	END;

FilterBySearch_Branch:
	BEGIN
	SELECT DISTINCT Id, EmployeeId, FirstName, LastName, PhoneNumber, Email, DateOfBirth, Address, City, PostalCode, Country FROM #TempTable
	WHERE YEAR(DateOfBirth) = YEAR(@DateOfBirth)
	OR SkillName = @SkillName 
	OR SkillLevel = @SkillLevel OR 
	YearsOfExperience = @YearsOfExperience

	RETURN;
	END;

AllFitersSearch_Branch:
	BEGIN
	SELECT DISTINCT Id, EmployeeId, FirstName, LastName, PhoneNumber, Email, DateOfBirth, Address, City, PostalCode, Country FROM #TempTable
	WHERE FirstName LIKE CONCAT('%',@SearchString, '%')
	OR LastName LIKE CONCAT('%',@SearchString,'%')
	OR Email LIKE CONCAT('%',@SearchString,'%')
	OR YEAR(DateOfBirth) = YEAR(@DateOfBirth)
	OR SkillName = @SkillName OR SkillLevel = @SkillLevel OR YearsOfExperience = @YearsOfExperience

	RETURN;
	END;

END");
		}

		public override void Down()
		{
			throw new NotImplementedException();
		}
	}
}
