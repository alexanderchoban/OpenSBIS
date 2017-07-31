using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OpenSBIS.Models;

namespace OpenSBIS.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {

        private readonly ILogger _logger;
        private readonly IProductRepository _productRepository;

        public ProductController(ILogger<ProductController> logger, IProductRepository productRepository)
        {
            _logger = logger;
            _productRepository = productRepository;
        }

        /// <summary>
        /// Gets all products.
        /// </summary>
        [HttpGet]
        public IActionResult GetAll([FromQuery] int companyId = 0)
        {
            return Ok(_productRepository.GetAll(companyId));
        }

        /// <summary>
        /// Gets product by id.
        /// </summary>
        /// <param name="id">
        /// Product id.
        /// </param>
        [HttpGet("{id}", Name = "GetProduct")]
        public IActionResult Get(int id)
        {
            var data = _productRepository.Get(id);

            if (data == null)
            {
                return NotFound();
            }

            return Ok(data);
        }

        /// <summary>
        /// Add a new product.
        /// </summary>
        /// <param name="item">
        /// The product to be added.
        /// </param>
        /// <returns>The new product</returns>
        [HttpPost]
        public IActionResult Post([FromBody] Product item)
        {
            var id = _productRepository.Add(item);
            var data = _productRepository.Get(id);

            return CreatedAtRoute("GetProduct", new { id = id }, data);
        }

        /// <summary>
        /// Updates an product.
        /// </summary>
        /// <param name="id">
        /// The id of the product.
        /// </param>
        /// <param name="item">
        /// The updated product.
        /// </param>
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Product item)
        {
            if (id != item.Id)
            {
                return BadRequest("Url ID does not match model id.");
            }

            try
            {
                _productRepository.Update(item);
            }
            catch (DataNotFoundException)
            {
                return NotFound();
            }

            return NoContent();
        }

        /// <summary>
        /// Deletes an product.
        /// </summary>
        /// <param name="id">
        /// The id of the product to delete.
        /// </param>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _productRepository.Delete(id);
            }
            catch (DataNotFoundException)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}