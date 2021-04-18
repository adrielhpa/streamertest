import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/_models/Course';
import { Project } from 'src/app/_models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl = 'http://localhost:5000/api/project';

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/all`);
  }

  getById(id: number): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.baseUrl}/${id}`);
  }

  getByCourseId(cId: number): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.baseUrl}/course/${cId}`);
  }

  Create(pro: Project): Observable<any>{
    return this.http.post(`${this.baseUrl}`, pro);
  }

  Update(pro: Project) {
    return this.http.put(`${this.baseUrl}/${pro.id}`, pro);
  }

  Delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
