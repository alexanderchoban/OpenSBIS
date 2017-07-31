using System;
using System.ComponentModel.DataAnnotations;


namespace OpenSBIS.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public int InventoryLocationId { get; set; }
        public string Name { get; set; }
        public string Sku { get; set; }
        public long Quantity { get; set; }

        public Company Company { get; set; }
    }
}