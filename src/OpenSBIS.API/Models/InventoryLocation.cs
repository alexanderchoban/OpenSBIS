using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OpenSBIS.Models
{
    public class InventoryLocation
    {
        [Key]
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string Name { get; set; }

        public List<Product> Products { get; set; }
        public Company Company { get; set; }
    }
}