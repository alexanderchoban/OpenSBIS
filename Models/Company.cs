using System;
using System.Collections.Generic;

namespace OpenSBIS.Models
{
    public class Company
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<Product> Products { get; set; }
        public List<InventoryLocation> InventoryLocations { get; set; }

    }
}