import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  postEmployeeData(data: any) {
    return this.http.post<any>('http://localhost:3000/employeeList/', data);
  }
  getEmployeeData() {
    return this.http.get<any>('http://localhost:3000/employeeList/');
  }

  putEmployeeData(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/employeeList/' + id, data);
  }
  deleteEmployeeData(id: number) {
    return this.http.delete<any>('http://localhost:3000/employeeList/' + id);
  }
}
