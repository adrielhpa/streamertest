import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../_models/Course';
import { Project } from '../_models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl = 'http://localhost:5000/api/project';

  constructor(private http: HttpClient) { }

  getById(id: number) {
    console.log('service ID: ', id);
    return this.http.get(`${this.baseUrl}/` + id);
  }

  getByCourseId(cId: number): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.baseUrl}/course/${cId}`);            //****Take a look !!!!*****
  }

  postCreate(pro: Project) {
    return this.http.post(`${this.baseUrl}`, pro);
  }

  Update(pro: Project) {
    // return this.http.put(`${this.baseUrl/${}}`)
  }

}
