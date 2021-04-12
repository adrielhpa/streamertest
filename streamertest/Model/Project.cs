using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SS_API.Model
{
    [Table("Projects")]
    public class Project
    {
        [Required(ErrorMessage = "The course is required.")]
        public virtual Course Course { get; set; }

        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "The name space must be completed.")]
        public string Name { get; set; }

        public string Image { get; set; }

        public string Why { get; set; }

        public string What { get; set; }

        public string WhatWillWeDo { get; set; }

        public ProjectStatus ProjectStatus { get; set; }        

        [ForeignKey("Course")]
        public int CourseId { get; set; }        
    }
}
