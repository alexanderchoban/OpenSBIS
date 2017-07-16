using System;
using System.Collections.Generic;
using System.Linq;

namespace OpenSBIS.Models
{
    public interface IProductRepository
    {
        IQueryable<Product> GetAll();
        Product Get(long id);
        long Add(Product company);
        void Update(Product company);
        void Delete(long id);
    }
}