using System;
using System.Collections.Generic;
using System.Linq;

namespace OpenSBIS.Models
{
    public interface IInventoryLocationRepository
    {
        IQueryable<InventoryLocation> GetAll(int companyId = 0);
        InventoryLocation Get(int id);
        int Add(InventoryLocation inventoryLocation);
        void Update(InventoryLocation inventoryLocation);
        void Delete(int id);
    }
}