import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProjectService } from '../_services/Project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  filteredProjects: any = [];
  projects: any = [];
  imageLarg = 70;
  imageMarg = 4;
  imageShow = false;
  modalRef: BsModalRef;

  _searchFilter = '';

  constructor(
     private projectService: ProjectService
    ,private modalService: BsModalService
  ) { }

  get searchFilter(): string {
  return this._searchFilter;
  }
  set searchFilter(value: string){
    this._searchFilter = value;
    this.filteredProjects = this.searchFilter ? this.projectsFilter(this.searchFilter) : this.projects;
  }

  openModal(modalTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modalTemplate);
  }

  ngOnInit() {
    this.getProject();
  }  

  projectsFilter(filter: string): any {
    filter = filter.toLocaleLowerCase();
    return this.projects.filter(
        projects => projects.name.toLocaleLowerCase().indexOf(filter) !== -1);
  } 

  showImages(){
    this.imageShow = !this.imageShow;
  }

  getProject(){
    this.projectService.getProject().subscribe(response => {
      this.projects = response;
      this.filteredProjects = this._searchFilter;
      console.log(this._searchFilter);
    }, error => {
      console.log(error);
    });
  }
}
