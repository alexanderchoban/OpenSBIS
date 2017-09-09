using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OpenSBIS.Models;

namespace OpenSBIS.Controllers
{
    [Route("api/[controller]")]
    public class CompanyController : Controller
    {

        private readonly ILogger _logger;
        private readonly ICompanyRepository _companyRepository;

        public CompanyController(ILogger<CompanyController> logger, ICompanyRepository companyRepository)
        {
            _logger = logger;
            _companyRepository = companyRepository;
        }

        /// <summary>
        /// Gets all companys.
        /// </summary>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_companyRepository.GetAll());
        }

        /// <summary>
        /// Gets company by id.
        /// </summary>
        /// <param name="id">
        /// Company id.
        /// </param>
        [HttpGet("{id}", Name = "GetCompany")]
        public IActionResult Get(int id)
        {
            var data = _companyRepository.Get(id);

            if (data == null)
            {
                return NotFound();
            }

            return Ok(data);
        }

        /// <summary>
        /// Add a new company.
        /// </summary>
        /// <param name="item">
        /// The company to be added.
        /// </param>
        /// <returns>The new company</returns>
        [HttpPost]
        public IActionResult Post([FromBody] Company item)
        {
            var id = _companyRepository.Add(item);
            var data = _companyRepository.Get(id);

            return CreatedAtRoute("GetCompany", new { id = id }, data);
        }

        /// <summary>
        /// Updates an company.
        /// </summary>
        /// <param name="id">
        /// The id of the company.
        /// </param>
        /// <param name="item">
        /// The updated company.
        /// </param>
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Company item)
        {
            if (id != item.Id)
            {
                return BadRequest("Url ID does not match model id.");
            }

            try
            {
                _companyRepository.Update(item);
            }
            catch (DataNotFoundException)
            {
                return NotFound();
            }

            return NoContent();
        }

        /// <summary>
        /// Deletes an company.
        /// </summary>
        /// <param name="id">
        /// The id of the company to delete.
        /// </param>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _companyRepository.Delete(id);
            }
            catch (DataNotFoundException)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}