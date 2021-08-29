import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from '../model/employee-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = "http://localhost:3000/employee";

  constructor(private http: HttpClient) { }

  getEmployee() {
    return this.http.get(this.apiUrl);
  }

  addEmployee(obj: EmployeeModel) {
    return this.http.post(this.apiUrl, obj);
  }

  updateEmployee(obj: EmployeeModel, id: number) {
    return this.http.put(`${this.apiUrl}/${id}`, obj);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
