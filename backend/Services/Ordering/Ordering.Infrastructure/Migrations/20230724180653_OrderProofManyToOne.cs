using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ordering.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class OrderProofManyToOne : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OrderProofs_OrderId",
                table: "OrderProofs");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProofs_OrderId",
                table: "OrderProofs",
                column: "OrderId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OrderProofs_OrderId",
                table: "OrderProofs");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProofs_OrderId",
                table: "OrderProofs",
                column: "OrderId",
                unique: true);
        }
    }
}
