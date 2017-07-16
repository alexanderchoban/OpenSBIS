using System;

namespace OpenSBIS.Models
{
    public class Product
    {
        public long Id { get; set; }
        public long CompanyId { get; set; }
        public long InventoryLocationId { get; set; }
        public string Name { get; set; }
        public string Sku { get; set; }
        public long Quantity {get; set; }
    }
}