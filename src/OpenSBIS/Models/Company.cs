using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OpenSBIS.Models
{
    public class Company
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public List<Product> Products { get; set; }
        public List<InventoryLocation> InventoryLocations { get; set; }

    }
}