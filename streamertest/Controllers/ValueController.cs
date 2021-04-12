using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SS_API.Data;
using SS_API.Model;

namespace streamertest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValueController : ControllerBase
    {
        private readonly StreamerContext _str;

        public ValueController(StreamerContext str) 
        {
            _str = str;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Project>> Get()
        {
            return _str.Projects.ToList();
        }
    }
}