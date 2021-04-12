import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl = 'http://localhost:5000/api/value';
  
  constructor(private http: HttpClient) { }
  
  getProject(){

    return this.http.get(this.baseUrl);
  }
}
