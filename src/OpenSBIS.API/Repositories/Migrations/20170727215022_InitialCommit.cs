using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace OpenSBIS.Migrations
{
    public partial class InitialCommit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InventoryLocations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    CompanyId = table.Column<long>(nullable: false),
                    CompanyId1 = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryLocations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InventoryLocations_Companies_CompanyId1",
                        column: x => x.CompanyId1,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    CompanyId = table.Column<long>(nullable: false),
                    CompanyId1 = table.Column<int>(nullable: true),
                    InventoryLocationId = table.Column<long>(nullable: false),
                    InventoryLocationId1 = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Quantity = table.Column<long>(nullable: false),
                    Sku = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Companies_CompanyId1",
                        column: x => x.CompanyId1,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Products_InventoryLocations_InventoryLocationId1",
                        column: x => x.InventoryLocationId1,
                        principalTable: "InventoryLocations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InventoryLocations_CompanyId1",
                table: "InventoryLocations",
                column: "CompanyId1");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CompanyId1",
                table: "Products",
                column: "CompanyId1");

            migrationBuilder.CreateIndex(
                name: "IX_Products_InventoryLocationId1",
                table: "Products",
                column: "InventoryLocationId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "InventoryLocations");

            migrationBuilder.DropTable(
                name: "Companies");
        }
    }
}
