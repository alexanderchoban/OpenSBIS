using Microsoft.EntityFrameworkCore;

namespace OpenSBIS.Models
{
    public class InventoryContext : DbContext
    {
        public InventoryContext(DbContextOptions<InventoryContext> options)
            : base(options)
        {
        }

        public DbSet<Product> TodoItems { get; set; }

    }
}