using System;
using System.Collections.Generic;
using System.Linq;

namespace OpenSBIS.Models
{
    public interface IProductRepository
    {
        IQueryable<Product> GetAll(int companyId = 0);
        Product Get(int id);
        int Add(Product company);
        void Update(Product company);
        void Delete(int id);
    }
}