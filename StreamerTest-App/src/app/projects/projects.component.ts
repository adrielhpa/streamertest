import { HttpClient } from '@angular/common/http';
import { Identifiers } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { identity } from 'rxjs';
import { Project } from '../_models/Project';
import { ProjectService } from '../_services/ProjectService.service';
import { ActivatedRoute } from '@angular/router';

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
  projectSearch !: number;

  _searchFilterById: number =1;
  _searchFilterByCourseId: number =3;

  constructor(
     private projectService: ProjectService
    , private fb: FormBuilder
    , private route: ActivatedRoute
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

    this.projects.forEach((p: Project) => {
      if (p.id == this.route.snapshot.params.id) {
        this.project = p;
      }
    });
  }

  projectsFilterById(filter: number): Project[] {
    return this.projects.filter(
        projects => projects.id === filter);
  }

  projectsFilterByCourseId(filter: number): Project[] {
    return this.projects.filter(
        projects => projects.courseId === filter);
  }

  showImages(){
    this.imageShow = !this.imageShow;
  }

  saveChanges(modalTemplate: Project) {
    if (this.registerForm.valid) {
      this.projectService.postCreate(modalTemplate).subscribe(
        data => {
          console.log(data);
        });
    }
  }

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

  getProjectById(id:number) {
    this.projectService.getByCourseId(id).subscribe(
      data => {(this.projects) = data;
        this.filteredProjects = this.projects;
      console.log(data);
    }, error => {
        console.log(error);
    });
  }

  getProjectByCourseId(id: number) {
    this.projectService.getByCourseId(id).subscribe(
      data => {(this.projects) = data;
        this.filteredProjects = this.projects;
      console.log(data);
    }, error => {
        console.log(error);
    });
  }
}
