using System;
using System.Collections.Generic;
using System.Linq;

namespace OpenSBIS.Models
{
    public interface ICompanyRepository
    {
        IQueryable<Company> GetAll();
        Company Get(long id);
        long Add(Company company);
        void Update(Company company);
        void Delete(long id);
    }
}