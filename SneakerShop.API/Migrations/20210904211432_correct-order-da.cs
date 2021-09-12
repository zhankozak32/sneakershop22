using Microsoft.EntityFrameworkCore.Migrations;

namespace SneakerShop.API.Migrations
{
    public partial class correctorderda : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SelectedSize",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SelectedSize",
                table: "Orders");
        }
    }
}
