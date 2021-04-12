import { Course } from "./Course";
import { ProjectStatus } from "./ProjectStatus.enum";

export interface Project {

    course: Course[]; 
    id : number; 
    name : string; 
    image : string; 
    why : string; 
    what : string; 
    whatWillWeDo : string 
    projectStatus: ProjectStatus[];         
    courseId : number;   
}