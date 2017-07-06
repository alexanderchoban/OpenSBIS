using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace OpenSBIS.Controllers
{
    [Route("api/[controller]")]
    public class InventoryController : Controller
    {

        private readonly ILogger _logger;

        public InventoryController(ILogger<InventoryController> logger)
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
        /// Gets inventory item by id.
        /// </summary>
        /// <param name="id">
        /// Inventory id.
        /// </param>
        [HttpGet("{id}", Name = "GetInventoryItem")]
        public IActionResult Get(Guid id)
        {
            return Ok("Item");
        }

        /// <summary>
        /// Add a new inventory item.
        /// </summary>
        /// <param name="item">
        /// The inventory item to be added.
        /// </param>
        /// <returns>The new inventory item</returns>
        [HttpPost]
        public IActionResult Post([FromBody] string item)
        {
            return CreatedAtRoute("GetInventoryItem", new { id = Guid.NewGuid() }, "new item");
        }

        /// <summary>
        /// Updates an inventory item.
        /// </summary>
        /// <param name="id">
        /// The id of the inventory item.
        /// </param>
        /// <param name="item">
        /// The updated inventory item.
        /// </param>
        [HttpPut("{id}")]
        public IActionResult Put(Guid id, [FromBody] string item)
        {
            // TODO: update the item

            return NoContent();
        }

        /// <summary>
        /// Deletes an inventory item.
        /// </summary>
        /// <param name="id">
        /// The id of the inventory item to delete.
        /// </param>
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            // TODO: delete item

            return NoContent();
        }
    }
}
