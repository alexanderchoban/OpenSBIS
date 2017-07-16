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
                .HasAnnotation("ProductVersion", "1.1.2");

            modelBuilder.Entity("OpenSBIS.Models.Company", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("OpenSBIS.Models.InventoryLocation", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("CompanyId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.ToTable("InventoryLocations");
                });

            modelBuilder.Entity("OpenSBIS.Models.Product", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("CompanyId");

                    b.Property<long>("InventoryLocationId");

                    b.Property<string>("Name");

                    b.Property<long>("Quantity");

                    b.Property<string>("Sku");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("InventoryLocationId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("OpenSBIS.Models.InventoryLocation", b =>
                {
                    b.HasOne("OpenSBIS.Models.Company")
                        .WithMany("InventoryLocations")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("OpenSBIS.Models.Product", b =>
                {
                    b.HasOne("OpenSBIS.Models.Company")
                        .WithMany("Products")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("OpenSBIS.Models.InventoryLocation")
                        .WithMany("Products")
                        .HasForeignKey("InventoryLocationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
