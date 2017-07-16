using Microsoft.EntityFrameworkCore;

namespace OpenSBIS.Models
{
    public class InventoryContext : DbContext
    {
        public InventoryContext(DbContextOptions<InventoryContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<InventoryLocation> InventoryLocations { get; set; }

    }
}