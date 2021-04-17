using Microsoft.AspNetCore.Mvc;
using SS_API.Model;
using SS_API.Services;
using System.Collections.Generic;

namespace SS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly CourseService _courseService;
        private readonly ProjectService _projectService;

        public ProjectController(CourseService courseService, ProjectService projectService)
        {
            _courseService = courseService;
            _projectService = projectService;
        }

        //GET All Courses
        [HttpGet]
        public List<Course> GetAllCourses()
        {
            return _courseService.GetAll();
        }

        //GETById: api/project/5
        [HttpGet("{Id}")]
        public Project GetById(int id)
        {
            return _projectService.GetById(id);
        }

        //GETByCourseId: api/project/course/5 
        [HttpGet]
        [Route("course/{id}")]
        public IEnumerable<Project> GetByCourseId(int id)
        {
            return _projectService.ListAllProjects(id);
        }

        //UPDATE
        [HttpPut]
        public bool Update(Project project)
        {
            return _projectService.Update(project);
        }

        //DELETE A PROJECT
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return _projectService.Delete(id);
        }

        //CREATE A COURSE/PROJECT
        [HttpPost]
        public int Create(Project model)
        {
            _projectService.Create(model);
            return model.Id;
        }
    }
}