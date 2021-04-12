using SS_API.Data;
using SS_API.Model;

namespace SS_API.Services
{
    public class CourseService
    {
        private readonly StreamerContext _streamerContext;

        public CourseService(StreamerContext streamerContext)
        {
            _streamerContext = streamerContext;
        }


        public Course GetById(int id)
        {
            var course = _streamerContext.Courses.Find(id);

            return course;
        }
    }
}
