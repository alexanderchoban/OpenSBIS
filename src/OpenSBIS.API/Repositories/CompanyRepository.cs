using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace OpenSBIS.Models
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly ILogger _logger;
        private readonly InventoryContext _dbcontext;

        public CompanyRepository(ILogger<CompanyRepository> logger, InventoryContext dbcontext)
        {
            _logger = logger;
            _dbcontext = dbcontext;
        }

        public IQueryable<Company> GetAll()
        {
            return _dbcontext.Companies.AsNoTracking();
        }
        public Company Get(int id)
        {
            return _dbcontext.Companies
                .AsNoTracking()
                .Include(x => x.InventoryLocations)
                .FirstOrDefault(x => x.Id == id);
        }
        public int Add(Company company)
        {
            _dbcontext.Companies.Add(company);
            _dbcontext.SaveChanges();
            return company.Id;
        }
        public void Update(Company company)
        {
            var companyToUpdate = _dbcontext.Companies.FirstOrDefault(x => x.Id == company.Id);

            if (companyToUpdate == null)
            {
                throw new DataNotFoundException("Company not found.");
            }

            companyToUpdate.Name = company.Name;

            _dbcontext.Update(companyToUpdate);
            _dbcontext.SaveChanges();
        }
        public void Delete(int id)
        {
            var companyToDelete = _dbcontext.Companies
                .Include(x => x.InventoryLocations)
                .Include(x => x.Products)
                .FirstOrDefault(x => x.Id == id);

            if (companyToDelete == null)
            {
                throw new DataNotFoundException("Company not found.");
            }

            _dbcontext.Remove(companyToDelete);
            _dbcontext.SaveChanges();
        }
    }
}