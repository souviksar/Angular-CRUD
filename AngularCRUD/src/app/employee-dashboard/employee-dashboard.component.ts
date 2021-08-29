import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeModel } from '../model/employee-model';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  myForm: FormGroup;
  employeeData: any = [];
  buttonType: string = 'Add';
  editMode: boolean = false;
  empId!: number;
  employeeModel: EmployeeModel = new EmployeeModel();

  constructor(private fb: FormBuilder,
    private employeeService: EmployeeService,
    private toastr: ToastrService) {
    this.myForm = fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    });
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  // Get all employees
  getAllEmployees() {
    this.employeeService.getEmployee().subscribe(res => {
      this.employeeData = res;
    }, err => {
      this.toastr.error('Somethig went wrong.', '');
    });
  }

  onClose() {
    this.myForm.reset();
  }

  submit() {
    if (!this.editMode) {
      this.addEmployee();
    } else {
      this.updateEmployee();
    }
  }

  onAdd() {
    this.buttonType = 'Add';
    this.editMode = false;
  }

  // Add employee
  addEmployee() {
    this.employeeModel.firstName = this.myForm.value.firstName;
    this.employeeModel.lastName = this.myForm.value.lastName;
    this.employeeModel.email = this.myForm.value.email;
    this.employeeModel.mobile = this.myForm.value.mobile;
    this.employeeModel.salary = this.myForm.value.salary;

    this.employeeService.addEmployee(this.employeeModel).subscribe(res => {
      let ref = document.getElementById('cancel');
      ref?.click();
      this.myForm.reset();
      this.toastr.info('Employee data added successfully.', '');
      this.getAllEmployees();
    }, err => {
      this.toastr.error('Somethig went wrong.', '');
    });
  }

  onEdit(emp: any) {
    this.empId = emp.id;
    this.myForm.controls['firstName'].setValue(emp.firstName);
    this.myForm.controls['lastName'].setValue(emp.lastName);
    this.myForm.controls['email'].setValue(emp.email);
    this.myForm.controls['mobile'].setValue(emp.mobile);
    this.myForm.controls['salary'].setValue(emp.salary);
    this.buttonType = 'Update'
    this.editMode = true;
  }

  // Update employee
  updateEmployee() {
    this.employeeModel.firstName = this.myForm.value.firstName;
    this.employeeModel.lastName = this.myForm.value.lastName;
    this.employeeModel.email = this.myForm.value.email;
    this.employeeModel.mobile = this.myForm.value.mobile;
    this.employeeModel.salary = this.myForm.value.salary;

    this.employeeService.updateEmployee(this.employeeModel, this.empId).subscribe(res => {
      let ref = document.getElementById('cancel');
      ref?.click();
      this.myForm.reset();
      this.toastr.info('Employee data updated successfully.', '');
      this.getAllEmployees();
    }, err => {
      this.toastr.error('Somethig went wrong.', '');
    });
  }

  // Delete employee
  deleteEmployee(emp: any) {
    let r = confirm("Do you want to delete this record?");
    if (r) {
      this.employeeService.deleteEmployee(emp.id).subscribe(res => {
        this.toastr.info('Employee data deleted successfully.', '');
        this.getAllEmployees();
      }, err => {
        this.toastr.error('Somethig went wrong.', '');
      });
    }
  }

}