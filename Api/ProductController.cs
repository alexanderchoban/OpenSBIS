using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace OpenSBIS.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {

        private readonly ILogger _logger;

        public ProductController(ILogger<ProductController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Gets all items in inventory.
        /// </summary>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new List<string>());
        }

        /// <summary>
        /// Gets product by id.
        /// </summary>
        /// <param name="id">
        /// Product id.
        /// </param>
        [HttpGet("{id}", Name = "GetProductItem")]
        public IActionResult Get(Guid id)
        {
            return Ok("Item");
        }

        /// <summary>
        /// Add a new product.
        /// </summary>
        /// <param name="item">
        /// The product to be added.
        /// </param>
        /// <returns>The new product</returns>
        [HttpPost]
        public IActionResult Post([FromBody] string item)
        {
            return CreatedAtRoute("GetProductItem", new { id = Guid.NewGuid() }, "new item");
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
        public IActionResult Put(Guid id, [FromBody] string item)
        {
            // TODO: update the item

            return NoContent();
        }

        /// <summary>
        /// Deletes an product.
        /// </summary>
        /// <param name="id">
        /// The id of the product to delete.
        /// </param>
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            // TODO: delete item

            return NoContent();
        }
    }
}