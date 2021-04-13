import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { identity } from 'rxjs';
import { Project } from '../_models/Project';
import { ProjectService } from '../_services/Project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  filteredProjects: any = [];
  projects: Project[] = [];

  project: Project;

  imageLarg = 70;
  imageMarg = 4;
  imageShow = false;
  registerForm: FormGroup;
  projectSearch: FormGroup;


  _searchFilterById: number = 4;
  _searchFilterByCourseId: number;

  constructor(
     private projectService: ProjectService
    , private fb: FormBuilder
  ) { }

  get searchFilterId(): number {
  return this._searchFilterById;
  }
  set searchFilterId(value: number){
    this._searchFilterById = value;
    this.filteredProjects = this.searchFilterId ? this.projectsFilterById(this.searchFilterId) : this.projects;
  }

  get searchFilterCourseId(): number {
    return this._searchFilterByCourseId;
    }
    set searchFilterCourseId(value: number){
      this._searchFilterByCourseId = value;
      this.filteredProjects = this.searchFilterCourseId ? this.projectsFilterByCourseId(this.searchFilterCourseId) : this.projects;
    }
  
  newProject(template: any) {
    this.openModal(template);
  }

  openModal(modalTemplate: any) {
    this.registerForm.reset();
    modalTemplate.show();
  }

  ngOnInit() {
    this.validation();
    this.projectSearch = this.fb.group({ id: new FormControl });
  }  

  projectsFilterById(filter: number): Project[] {
    return this.projects.filter(
        projects => projects.id == filter);
  }
  
  projectsFilterByCourseId(filter: number): Project[] {
    return this.projects.filter(
        projects => projects.courseId == filter);
  } 

  showImages(){
    this.imageShow = !this.imageShow;
  }

  // saveChanges(template: any) {
  //   if (this.registerForm.valid) {
  //     this.project = Object.assign({}, this.registerForm.value);
  //     this.projectService.postCreate(this.project).subscribe(
  //       (newProject: Project) => {
  //         console.log(newProject);
  //         template.hide();
  //         this.getProject();
  //       }, error => { console.log(error); }
  //     );
  //   }
  // }

  validation() {
    this.registerForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(2)]],
      image: new FormControl,
      why: new FormControl,
      what: new FormControl,
      whatWillWeDo: new FormControl,
      projectStatus: new FormControl,
      course: new FormControl,
      courseId: ['', Validators.required]
    });

    
  }

  getProjectById(_searchFilterById){
    this.projectService.getById(_searchFilterById).subscribe(
      data => {(this.project) = data;
      console.log(data);
    }, error => {
        console.log(error);
    });
  }

  getProjectByCourseId(projectSearch) {
    this.projectService.getByCourseId(projectSearch).subscribe(
      dataCourseId => {(this.projects) = dataCourseId;
        console.log(dataCourseId);
      }, error => {
          console.log(error);
    });
  }
}