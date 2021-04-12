using SS_API.Data;
using SS_API.Model;
using System.Collections.Generic;
using System.Linq;

namespace SS_API.Services
{
    public class ProjectService 
    {
        private readonly StreamerContext _streamerContext;

        public ProjectService(StreamerContext streamerContext)
        {
            _streamerContext = streamerContext;
        }

        public Project GetById(int id)
        {
            var project = _streamerContext.Projects.Find(id);

            return project;
        }

        //ADD A NEW PROJECT
        public Project Create (Project model)
        {
            _streamerContext.Add(model);
            _streamerContext.SaveChanges();

            var strId = _streamerContext.Projects.Find(model.Id);
            return strId;
        }
        //UPDATE A PROJECT
        public bool Update(Project project)
        {
            var entity = _streamerContext.Projects.Find(project.Id);
           
            if (entity != null)
            {
                entity.Name = project.Name;
                entity.Image = project.Image;
                entity.Why = project.Why;
                entity.What = project.What;
                entity.WhatWillWeDo = project.WhatWillWeDo;
                entity.ProjectStatus = project.ProjectStatus;
                entity.CourseId = project.CourseId;

                _streamerContext.SaveChanges();
                
            }         
            if (entity == null)
            {
                throw new System.Exception("You must to input a valid Id");
            }

            return true;
        }

        //GET ALL PROJECTS WITHIN A COURSE
        public IEnumerable<Project> ListAllProjects(int id)
        {
            var list = _streamerContext.Projects.Where(a => a.CourseId == id).ToList();

            return list;
        }

        //DELETE A PROJECT
        public bool Delete(int id)
        {
            var str =_streamerContext.Projects.Find(id);

            if (str == null)
            {
                throw new System.Exception("You must to input a valid Id");
            }

            _streamerContext.Remove(str);
            _streamerContext.SaveChanges();

            return true;         
        }
    }
}