using System;
using System.Collections.Generic;
using System.Linq;

namespace OpenSBIS.Models
{
    public interface IInventoryLocationRepository
    {
        IQueryable<InventoryLocation> GetAll();
        InventoryLocation Get(long id);
        long Add(InventoryLocation company);
        void Update(InventoryLocation company);
        void Delete(long id);
    }
}