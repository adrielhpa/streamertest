using Microsoft.EntityFrameworkCore;
using SS_API.Model;

namespace SS_API.Data
{
    public class StreamerContext : DbContext
    {
        public StreamerContext(DbContextOptions<StreamerContext> option) : base(option) {}

        public DbSet<Course> Courses { get; set; }
        public DbSet<Project> Projects { get; set; }

        protected override void OnModelCreating(ModelBuilder cascade)
        {
            cascade.Entity<Project>().HasOne(c => c.Course).WithMany(d => d.Project)
                                     .HasForeignKey(p => p.CourseId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}