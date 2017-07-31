using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using OpenSBIS.Models;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace OpenSBIS
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
            IsDevelopement = env.IsDevelopment();
        }

        public IConfigurationRoot Configuration { get; }
        public bool IsDevelopement { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // add transients
            services.AddTransient<ICompanyRepository, CompanyRepository>();
            services.AddTransient<IInventoryLocationRepository, InventoryLocationRepository>();
            services.AddTransient<IProductRepository, ProductRepository>();

            services.AddMvc()
                .AddJsonOptions(opt =>
                {
                    opt.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    opt.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                    opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });

            // Add framework services.
            services.AddMvc();

            if (!IsDevelopement)
            {
                Console.Write("Waiting 10 seconds for production db to boot... ");
                System.Threading.Thread.Sleep(10000);
                Console.WriteLine("Done.");
            }

            services.AddDbContext<InventoryContext>(options => options.UseNpgsql(Environment.GetEnvironmentVariable("ConnectionString")));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, InventoryContext dbcontext)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            // protect api with identity server
            app.UseIdentityServerAuthentication(new IdentityServerAuthenticationOptions
            {
                Authority = Environment.GetEnvironmentVariable("IDSRV_URL"),
                ApiName = Environment.GetEnvironmentVariable("IDSRV_API"),
                RequireHttpsMetadata = false,

                EnableCaching = true,
                CacheDuration = TimeSpan.FromMinutes(10), // that's the default
                AutomaticAuthenticate = true,
                AutomaticChallenge = true
            });

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });

            // run database migrations on startup
            dbcontext.Database.Migrate();
        }
    }
}
