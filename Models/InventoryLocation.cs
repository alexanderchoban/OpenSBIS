using System;
using System.Collections.Generic;

namespace OpenSBIS.Models
{
    public class InventoryLocation
    {
        public long Id { get; set; }
        public long CompanyId { get; set; }
        public string Name { get; set; }

        public List<Product> Products { get; set; }
    }
}