using System;

namespace OpenSBIS.Models
{
    public class InventoryItem
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Sku { get; set; }
        public long Quantity {get; set; }
    }
}