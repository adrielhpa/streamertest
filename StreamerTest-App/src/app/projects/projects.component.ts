import { Project } from './../_models/Project';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../_models/Course';
import { ProjectService } from '../_services/_projectServices/ProjectService.service';
import { CourseService } from '../_services/_courseService/_courseService.service';
import { ToastrService } from 'ngx-toastr';
import { templateJitUrl } from '@angular/compiler';
import { ProjectStatus } from '../_models/ProjectStatus.enum';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {

  filteredProjects: any = [];
  projects: Project[] = [];
  courses: Course[] = [];

  proj: Project;

  imageLarg = 70;
  imageMarg = 4;
  imageShow = false;
  registerForm: FormGroup;
  excludeProject = '';

  modoSave = '';

  _projectFilterById: number;
  _projectFilterByCourseId: number;

  constructor(
    private projectService: ProjectService
    , private courseService: CourseService
    , private fb: FormBuilder
    , private route: ActivatedRoute
    , private toast: ToastrService
  ) { }

  get projectFilterById(): number {
    return this._projectFilterById;
  }
  set projectFilterById(value: number){
    this._projectFilterById = value;
    this.filteredProjects = this.projectFilterById ? this.projectsFilterById(this.projectFilterById) : this.projects;
  }

  get projectFilterByCourseId(): number {
    return this._projectFilterByCourseId;
  }
  set projectFilterByCourseId(value: number){
    this._projectFilterByCourseId = value;
    this.filteredProjects = this.projectFilterByCourseId ? this.projectsFilterByCourseId(this.projectFilterByCourseId) : this.projects;
  }

  ngOnInit() {
    this.getAllCourses();
    this.validation();
    this.getAllProjects();

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
    this.registerForm.reset();
    modalTemplate.show();
  }
  hideModal(modalTemplate: any) {
    modalTemplate.hide();
  }


  projectsFilterById(filter: number): any {
    return this.projects.filter(
      proj => proj.id === filter);
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
      data => {(this.projects) = data;
               console.log(data);
    }, error => {
      console.log(error);
    });
  }

  getProjectByCourseId(id: number) {
    this.projectService.getByCourseId(id).subscribe(
      data => {(this.projects) = data;
               console.log(data);
    }, error => {
      console.log(error);
    });
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data;
      console.log(data);
    });
  }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe(data => {
      this.projects = data;
      this.filteredProjects = this.projects;
      console.log(data);
    });
  }

  newProject(template: any) {
    this.modoSave = 'post';
    this.openModal(template);
    this.saveChanges(template);
  }

  updateProject(project: Project, template: any) {
    this.modoSave = 'put';

    this.openModal(template);

    this.proj = project;
    this.registerForm.patchValue(project);
  }

  deleteProject(proj: Project, template) {
    template.show();
    this.proj = proj;
    this.excludeProject = `Are you sure to delete this project: ${proj.name}, Id: ${proj.id} ?`;
  }

  confirmDelete(template: any) {
    this.projectService.Delete(this.proj.id).subscribe(
      () => {
        template.hide();
        this.getAllProjects();
      }, error => {
        console.log(error);
      }
    );
    this.toast.success('Done successfully', 'Success!');
  }

  saveChanges(modalTemplate: any) {

    if (this.registerForm.valid) {
      if (this.modoSave === 'post') {

        var pro = new Project();
        pro.name = this.registerForm.get('name').value;
        pro.image = this.registerForm.get('image').value;
        pro.why = this.registerForm.get('why').value;
        pro.what = this.registerForm.get('what').value;
        pro.whatWillWeDo = this.registerForm.get('whatWillWeDo').value;
        pro.courseId = this.registerForm.get('courseId').value;

        this.projectService.Create(pro).subscribe(data => { console.log(data) });
        this.toast.success('Done successfully', 'Success!');
        modalTemplate.hide();
        this.getAllProjects();
      }
      else {
        this.proj = Object.assign({ id: this.proj.id }, this.registerForm.value);
        this.projectService.Update(this.proj).subscribe(data => {console.log(data);});

        this.toast.success('Done successfully', 'Success!');
        modalTemplate.hide();
        this.getAllProjects();
      }
    }
  }
}
