using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using OpenSBIS.Models;

namespace OpenSBIS_API
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
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
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.WithOrigins(Environment.GetEnvironmentVariable("WEB_URL"))
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
            services.Configure<MvcOptions>(options =>
            {
                options.Filters.Add(new CorsAuthorizationFilterFactory("AllowSpecificOrigin"));
            });

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

            // protect api with identity server
            /*app.UseIdentityServerAuthentication(new IdentityServerAuthenticationOptions
            {
                Authority = Environment.GetEnvironmentVariable("IDSRV_URL"),
                ApiName = Environment.GetEnvironmentVariable("IDSRV_API"),
                RequireHttpsMetadata = false,

                EnableCaching = true,
                CacheDuration = TimeSpan.FromMinutes(10), // that's the default
                AutomaticAuthenticate = true,
                AutomaticChallenge = true
            });*/

            app.UseMvc();
            app.UseCors("AllowSpecificOrigin");

            // run database migrations on startup
            dbcontext.Database.Migrate();
        }
    }
}
