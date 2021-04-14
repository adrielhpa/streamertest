import { ProjectStatus } from './../_models/ProjectStatus.enum';
import { Project } from './../_models/Project';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../_services/ProjectService.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../_models/Course';

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
  projectSearch : Project[] = [];

  _searchFilterById: number;
  _searchFilterByCourseId: number;

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

  modalProject(template: any) {
    this.openModal(template);
  }

  openModal(modalTemplate: any) {

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
      data => {(this.project) = data;
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

  updateProject(up: Project) {

    this.openModal(up);

    const input = [(<HTMLInputElement>document.getElementById("name")).value,
    (<HTMLInputElement>document.getElementById("why")).value,
    (<HTMLInputElement>document.getElementById("image")).value,
    (<HTMLInputElement>document.getElementById("what")).value,
    (<HTMLInputElement>document.getElementById("whatWillWeDo")).value,
    (<HTMLInputElement>document.getElementById("projectStatus")).value,
      (<HTMLInputElement>document.getElementById("courseId")).value];

  //   this.registerForm.setValue({'name': 'up.name' ,'why': input[1], "image": input[2],
  //   'what': input[3], 'whatWillWeDo': input[4], "projectStatus": input[5], "courseId": parseInt(input[6]), "course": ''
  // });

    var pro = new Project();
    pro.name = input[0];
    pro.why = input[1];
    pro.image = input[2];
    pro.what = input[3];
    pro.whatWillWeDo = input[4];
    pro.projectStatus = ProjectStatus[input[5]];
    pro.courseId = parseInt(input[6], 10);

    console.log(input);

    this.projectService.Update(pro).subscribe(data => {console.log(data)});
  }

  saveChanges(modalTemplate: Project) {

    const input = [(<HTMLInputElement>document.getElementById("name")).value,
    (<HTMLInputElement>document.getElementById("why")).value,
    (<HTMLInputElement>document.getElementById("image")).value,
    (<HTMLInputElement>document.getElementById("what")).value,
    (<HTMLInputElement>document.getElementById("whatWillWeDo")).value,
    (<HTMLInputElement>document.getElementById("projectStatus")).value,
    (<HTMLInputElement>document.getElementById("courseId")).value];

    var pro = new Project();
    pro.name = input[0];
    pro.why = input[1];
    pro.image = input[2];
    pro.what = input[3];
    pro.whatWillWeDo = input[4];
    pro.projectStatus = ProjectStatus[input[5]];
    pro.courseId = parseInt(input[6], 10);


    this.projectService.Create(pro).subscribe(data => { console.log(data)});

    console.log(input);

    }

  deleteProject(project) {
    console.log(project);

    const input = [(<HTMLInputElement>document.getElementById("id")).value,
      (<HTMLInputElement>document.getElementById("name")).value,
    (<HTMLInputElement>document.getElementById("why")).value,
    (<HTMLInputElement>document.getElementById("image")).value,
    (<HTMLInputElement>document.getElementById("what")).value,
    (<HTMLInputElement>document.getElementById("whatWillWeDo")).value,
    (<HTMLInputElement>document.getElementById("projectStatus")).value,
          (<HTMLInputElement>document.getElementById("courseId")).value
    ];

      this.registerForm.setValue({'name': 'up.name' ,'why': "", "image": "",
    'what': "", 'whatWillWeDo': "", "projectStatus": "", "courseId": "", "course": "a"
  });

    this.project.name = input[0];
    this.project.why = input[1];
    this.project.image = input[2];
    this.project.what = input[3];
    this.project.whatWillWeDo = input[4];
    this.project.projectStatus = ProjectStatus[input[5]];
    this.project.courseId = parseInt(input[6]);

    console.log(project);

    this.projectService.Delete(project).subscribe(res => console.log(res));

  }
}
