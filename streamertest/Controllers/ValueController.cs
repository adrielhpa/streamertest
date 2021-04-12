using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SS_API.Data;
using SS_API.Model;
using SS_API.Services;

namespace streamertest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValueController : ControllerBase
    {

        private readonly CourseService _courseService;
        private readonly ProjectService _projectService;
        private readonly StreamerContext _str;

        public ValueController(StreamerContext str, CourseService courseService, ProjectService projectService) 
        {
            _str = str;
             _courseService = courseService;
            _projectService = projectService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Project>> Get()
        {
            return _str.Projects.ToList();
        }

        [HttpPost]
        public int Create(Project model)
        {
            var created =_projectService.Create(model);
            return model.Id;
        }
    }
}