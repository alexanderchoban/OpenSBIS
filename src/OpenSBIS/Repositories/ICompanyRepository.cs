using System;
using System.Collections.Generic;
using System.Linq;

namespace OpenSBIS.Models
{
    public interface ICompanyRepository
    {
        IQueryable<Company> GetAll();
        Company Get(int id);
        int Add(Company company);
        void Update(Company company);
        void Delete(int id);
    }
}