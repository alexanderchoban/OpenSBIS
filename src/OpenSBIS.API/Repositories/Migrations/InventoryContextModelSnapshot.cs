using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using OpenSBIS.Models;

namespace OpenSBIS.Migrations
{
    [DbContext(typeof(InventoryContext))]
    partial class InventoryContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "1.1.2");

            modelBuilder.Entity("OpenSBIS.Models.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("OpenSBIS.Models.InventoryLocation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("CompanyId");

                    b.Property<int?>("CompanyId1");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId1");

                    b.ToTable("InventoryLocations");
                });

            modelBuilder.Entity("OpenSBIS.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("CompanyId");

                    b.Property<int?>("CompanyId1");

                    b.Property<long>("InventoryLocationId");

                    b.Property<int?>("InventoryLocationId1");

                    b.Property<string>("Name");

                    b.Property<long>("Quantity");

                    b.Property<string>("Sku");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId1");

                    b.HasIndex("InventoryLocationId1");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("OpenSBIS.Models.InventoryLocation", b =>
                {
                    b.HasOne("OpenSBIS.Models.Company", "Company")
                        .WithMany("InventoryLocations")
                        .HasForeignKey("CompanyId1");
                });

            modelBuilder.Entity("OpenSBIS.Models.Product", b =>
                {
                    b.HasOne("OpenSBIS.Models.Company", "Company")
                        .WithMany("Products")
                        .HasForeignKey("CompanyId1");

                    b.HasOne("OpenSBIS.Models.InventoryLocation")
                        .WithMany("Products")
                        .HasForeignKey("InventoryLocationId1");
                });
        }
    }
}
