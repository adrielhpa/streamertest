import { Course } from "./Course";
import { ProjectStatus } from "./ProjectStatus.enum";

export class Project {

    id : number; 
    name : string; 
    image?: string; 
    why?: string; 
    what?: string; 
    whatWillWeDo?: string 
    projectStatus?: ProjectStatus[];
    courseId: number;
    course: Course[];
}
