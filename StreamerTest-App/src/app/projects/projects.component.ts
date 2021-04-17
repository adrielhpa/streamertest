import { ProjectStatus } from './../_models/ProjectStatus.enum';
import { Project } from './../_models/Project';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { Course } from '../_models/Course';
import { ProjectService } from '../_services/_projectServices/ProjectService.service';
import { CourseService } from '../_services/_courseService/_courseService.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  filteredProjects: any = [];
  projects: Project[] = [];

  proj: Project;

  courses: Course[] = [];
  projectStatus: ProjectStatus[] = [];
  pro: ProjectStatus;

  imageLarg = 70;
  imageMarg = 4;
  imageShow = false;
  registerForm: FormGroup;



  _searchFilterById: number;
  _searchFilterByCourseId: number;

  constructor(
    private projectService: ProjectService
    , private courseService: CourseService
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

  ngOnInit() {
    this.getAllCourses();
    this.validation();

    this.projects.forEach((p: Project) => {
      if (p.id == this.route.snapshot.params.id) {
        this.proj = p;
      }
    });
  }

  modalProject(template: any) {
    this.openModal(template);
  }

  openModal(modalTemplate: any) {

    modalTemplate.show();
  }
  hideModal(modalTemplate: any) {
    modalTemplate.hide();
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

  validation() {

    this.registerForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(2)]],
      image: new FormControl,
      why: new FormControl,
      what: new FormControl,
      whatWillWeDo: new FormControl,
      projectStatus: new FormControl,
      courseId: ['', Validators.required],
      course: new FormControl
    });
  }

  getProjectById(id:number) {
    this.projectService.getById(id).subscribe(
      data => {(this.proj) = data;
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

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data;
      console.log(data)
    });
  }

  updateProject(up: Project) {

    up.name = this.registerForm.get('name').value;
    up.image = this.registerForm.get('image').value;
    up.why = this.registerForm.get('why').value;
    up.what = this.registerForm.get('what').value;
    up.whatWillWeDo = this.registerForm.get('whatWillWeDo').value;
    up.courseId = this.registerForm.get('courseId').value;

    this.projectService.Update(up).subscribe(data => console.log(data));

    this.hideModal(up);
  }

  saveChanges(modalTemplate: Project) {

    var pro = new Project();
    pro.name = this.registerForm.get('name').value;
    pro.image = this.registerForm.get('image').value;
    pro.why = this.registerForm.get('why').value;
    pro.what = this.registerForm.get('what').value;
    pro.whatWillWeDo = this.registerForm.get('whatWillWeDo').value;
    pro.courseId = this.registerForm.get('courseId').value;

    this.projectService.Create(pro).subscribe(data => console.log(data));

    this.hideModal(modalTemplate);
  }

  deleteProject(project) {

  }
}
