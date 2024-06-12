using Abp.AspNetCore;
using Abp.AspNetCore.Configuration;
using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Shesha;
using Shesha.Modules;
using Shesha.Web.FormsDesigner;
using System.Reflection;
using System.Threading.Tasks;


namespace Maseru.Assesment
{
	/// <summary>
	/// Assesment Module
	/// </summary>
	[DependsOn(
		typeof(AssesmentModule),
		typeof(SheshaCoreModule),
		typeof(AbpAspNetCoreModule)
	)]
	public class AssesmentApplicationModule : SheshaSubModule<AssesmentModule>
	{
		public override async Task<bool> InitializeConfigurationAsync()
		{
			// Import any configuration embeded as resources in this assembly on application start-up.
			return await ImportConfigurationAsync();
		}

		/// inheritedDoc
		public override void Initialize()
		{
			var thisAssembly = Assembly.GetExecutingAssembly();
			IocManager.RegisterAssemblyByConvention(thisAssembly);

			Configuration.Modules.AbpAutoMapper().Configurators.Add(
				// Scan the assembly for classes which inherit from AutoMapper.Profile
				cfg => cfg.AddMaps(thisAssembly)
			);
		}

		/// inheritedDoc
		public override void PreInitialize()
		{
			base.PreInitialize();

			Configuration.Modules.AbpAspNetCore()
				.CreateControllersForAppServices(
					typeof(SheshaCoreModule).GetAssembly()
				);

			Configuration.Modules.AbpAspNetCore()
				 .CreateControllersForAppServices(
					 typeof(SheshaApplicationModule).GetAssembly()
				 );

			Configuration.Modules.AbpAspNetCore()
				 .CreateControllersForAppServices(
					 typeof(SheshaFormsDesignerModule).GetAssembly()
				 );

			Configuration.Modules.AbpAspNetCore()
				 .CreateControllersForAppServices(
					 typeof(SheshaFrameworkModule).GetAssembly()
				 );

			Configuration.Modules.AbpAspNetCore().CreateControllersForAppServices(
			   typeof(AssesmentApplicationModule).Assembly,
			   moduleName: "Assesment",
				useConventionalHttpVerbs: true);

			Configuration.Modules.AbpAspNetCore()
				 .CreateControllersForAppServices(
					 typeof(AssesmentModule).GetAssembly()
				 );

			Configuration.Modules.AbpAspNetCore()
				 .CreateControllersForAppServices(
					 typeof(AssesmentApplicationModule).GetAssembly()
				 );
		}
	}
}
