import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/_models/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  baseUrl = 'http://localhost:5000/api/project';

  constructor(private http: HttpClient) { }

  getAllCourses() {
    return this.http.get<Course[]>(this.baseUrl);
  }
}
