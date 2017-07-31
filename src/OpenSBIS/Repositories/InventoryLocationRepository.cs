using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace OpenSBIS.Models
{
    public class InventoryLocationRepository : IInventoryLocationRepository
    {
        private readonly ILogger _logger;
        private readonly InventoryContext _dbcontext;

        public InventoryLocationRepository(ILogger<InventoryLocationRepository> logger, InventoryContext dbcontext)
        {
            _logger = logger;
            _dbcontext = dbcontext;
        }
        
        public IQueryable<InventoryLocation> GetAll(int companyId = 0)
        {
            var data = _dbcontext.InventoryLocations
                .Include(x => x.Company)
                .AsNoTracking();

            if (companyId > 0)
            {
                data = data.Where(x => x.CompanyId == companyId);
            }

            return data;
        }
        public InventoryLocation Get(int id)
        {
            return _dbcontext.InventoryLocations
                .AsNoTracking()
                .Include(x => x.Company)
                .FirstOrDefault(x => x.Id == id);
        }
        public int Add(InventoryLocation inventoryLocation)
        {
            _dbcontext.InventoryLocations.Add(inventoryLocation);
            _dbcontext.SaveChanges();
            return inventoryLocation.Id;
        }
        public void Update(InventoryLocation inventoryLocation)
        {
            var inventoryLocationToUpdate = _dbcontext.InventoryLocations
                .FirstOrDefault(x => x.Id == inventoryLocation.Id && x.CompanyId == inventoryLocation.CompanyId);

            if (inventoryLocationToUpdate == null)
            {
                throw new DataNotFoundException("InventoryLocation not found.");
            }

            inventoryLocationToUpdate.Name = inventoryLocation.Name;

            _dbcontext.Update(inventoryLocationToUpdate);
            _dbcontext.SaveChanges();
        }
        public void Delete(int id)
        {
            var inventoryLocationToDelete = _dbcontext.InventoryLocations.FirstOrDefault(x => x.Id == id);

            if (inventoryLocationToDelete == null)
            {
                throw new DataNotFoundException("InventoryLocation not found.");
            }

            _dbcontext.Remove(inventoryLocationToDelete);
            _dbcontext.SaveChanges();
        }
    }
}