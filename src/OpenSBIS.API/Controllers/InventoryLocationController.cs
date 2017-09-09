using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OpenSBIS.Models;

namespace OpenSBIS.Controllers
{
    [Route("api/[controller]")]
    public class InventoryLocationController : Controller
    {

        private readonly ILogger _logger;
        private readonly IInventoryLocationRepository _inventoryLocationRepository;

        public InventoryLocationController(ILogger<InventoryLocationController> logger, IInventoryLocationRepository inventoryLocationRepository)
        {
            _logger = logger;
            _inventoryLocationRepository = inventoryLocationRepository;
        }

        /// <summary>
        /// Gets all inventoryLocations.
        /// </summary>
        [HttpGet]
        public IActionResult GetAll([FromQuery] int companyId = 0)
        {
            _logger.LogDebug($"Company Id for InventoryLocationController.GetAll: {companyId}");
            return Ok(_inventoryLocationRepository.GetAll(companyId));
        }

        /// <summary>
        /// Gets inventoryLocation by id.
        /// </summary>
        /// <param name="id">
        /// InventoryLocation id.
        /// </param>
        [HttpGet("{id}", Name = "GetInventoryLocation")]
        public IActionResult Get(int id)
        {
            var data = _inventoryLocationRepository.Get(id);

            if (data == null)
            {
                return NotFound();
            }

            return Ok(data);
        }

        /// <summary>
        /// Add a new inventoryLocation.
        /// </summary>
        /// <param name="item">
        /// The inventoryLocation to be added.
        /// </param>
        /// <returns>The new inventoryLocation</returns>
        [HttpPost]
        public IActionResult Post([FromBody] InventoryLocation item)
        {
            var id = _inventoryLocationRepository.Add(item);
            var data = _inventoryLocationRepository.Get(id);

            return CreatedAtRoute("GetInventoryLocation", new { id = id }, data);
        }

        /// <summary>
        /// Updates an inventoryLocation.
        /// </summary>
        /// <param name="id">
        /// The id of the inventoryLocation.
        /// </param>
        /// <param name="item">
        /// The updated inventoryLocation.
        /// </param>
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] InventoryLocation item)
        {
            if (id != item.Id)
            {
                return BadRequest("Url ID does not match model id.");
            }

            try
            {
                _inventoryLocationRepository.Update(item);
            }
            catch (DataNotFoundException)
            {
                return NotFound();
            }

            return NoContent();
        }

        /// <summary>
        /// Deletes an inventoryLocation.
        /// </summary>
        /// <param name="id">
        /// The id of the inventoryLocation to delete.
        /// </param>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _inventoryLocationRepository.Delete(id);
            }
            catch (DataNotFoundException)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}