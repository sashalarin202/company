import { Component, OnInit } from '@angular/core';
import { EmployeeRepo, DepartmentRepo } from 'src/app/shared.service';
import { Department, Employee } from '../contracts';
import { ShowEmpService } from './show-emp/show-emp.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  departments: Department[] = [];
  employees: Employee[]=[];

  constructor(
    private employeeRepo:EmployeeRepo,
    private departmentRepo:DepartmentRepo,
    private showEmpService:ShowEmpService
    ){}

  ngOnInit(): void {
    this.employeeRepo.getList().subscribe(
      (employees)=>{
        this.employees=employees;
      }
    );
    this.departmentRepo.getList().subscribe(
      (departments)=>{
        this.departments=departments;
      }
    )
  }

  getDepartmentName(depId: number) {
    return this.departments.find(d => d.Id === depId)?.Name;
  }

  onAddEmployee(){
    this.showEmpService.add(this.departments).then(employee=>{
      this.employeeRepo.add(employee).subscribe(
        ()=>{this.employees.push(employee)}
      )
    })
  }

  deleteClick(item:number){
    console.log(item)
    if(confirm("Are you sure?")){
      this.employeeRepo.delete(item).subscribe(data=>{
        this.employeeRepo.getList().subscribe(
          (employees)=>{
            this.employees=employees;
          }
        );
        alert(data.toString())
      })
    }
  }
}