using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace OpenSBIS.Models
{
    public class ProductRepository : IProductRepository
    {
        private readonly ILogger _logger;
        private readonly InventoryContext _dbcontext;

        public ProductRepository(ILogger<ProductRepository> logger, InventoryContext dbcontext)
        {
            _logger = logger;
            _dbcontext = dbcontext;
        }
        
        public IQueryable<Product> GetAll()
        {
            return _dbcontext.Products.AsNoTracking();
        }
        public Product Get(long id)
        {
            return _dbcontext.Products.AsNoTracking().FirstOrDefault(x => x.Id == id);
        }
        public long Add(Product product)
        {
            _dbcontext.Products.Add(product);
            _dbcontext.SaveChanges();
            return product.Id;
        }
        public void Update(Product product)
        {
            var productToUpdate = _dbcontext.Products.FirstOrDefault(x => x.Id == product.Id && product.CompanyId == x.CompanyId);

            if (productToUpdate == null)
            {
                throw new DataNotFoundException("Product not found.");
            }

            productToUpdate.Name = product.Name;
            productToUpdate.InventoryLocationId = product.InventoryLocationId;
            productToUpdate.Sku = product.Sku;
            productToUpdate.Quantity = product.Quantity;

            _dbcontext.Update(productToUpdate);
            _dbcontext.SaveChanges();
        }
        public void Delete(long id)
        {
            var productToDelete = _dbcontext.Products.FirstOrDefault(x => x.Id == id);

            if (productToDelete == null)
            {
                throw new DataNotFoundException("Product not found.");
            }

            _dbcontext.Remove(productToDelete);
            _dbcontext.SaveChanges();
        }
    }
}