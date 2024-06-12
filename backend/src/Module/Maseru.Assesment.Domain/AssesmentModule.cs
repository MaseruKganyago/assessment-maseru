using Abp.AspNetCore.Configuration;
using Abp.AutoMapper;
using Abp.Modules;
using Shesha;
using Shesha.Modules;
using System.Reflection;

namespace Maseru.Assesment
{
	/// <summary>
	/// Assesment Module
	/// </summary>
	[DependsOn(
		typeof(SheshaCoreModule),
		typeof(SheshaApplicationModule)
	)]
	public class AssesmentModule : SheshaModule
	{
		public override SheshaModuleInfo ModuleInfo => new SheshaModuleInfo("Maseru.Assesment")
		{
			FriendlyName = "Assesment",
			Publisher = "Maseru",
		};
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
		}

		/// inheritedDoc
		public override void PostInitialize()
		{
			Configuration.Modules.AbpAspNetCore().CreateControllersForAppServices(
				typeof(AssesmentModule).Assembly,
				moduleName: "Assesment",
				useConventionalHttpVerbs: true);
		}
	}
}