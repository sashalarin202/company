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
        ()=>{this.employees.push(employee);
          this.employeeRepo.getList().subscribe(
            (employees)=>{
              this.employees=employees;
            }
          );
        }
      )
    })
  }

  async onEditClick(empId: number) {
    const empIndex = this.employees.findIndex(e => e.Id === empId);
    if (empIndex < 0) {
      throw new Error(`Employee with ID ${empId} not found`);
    }
    try {
      const editedEmp = await this.showEmpService.edit(this.departments, this.employees[empIndex]);
      this.employees[empIndex] = editedEmp;
      this.employeeRepo.update(editedEmp).subscribe()
    } catch (ex) {
      if (ex !== 'cancel') {
        throw ex;
      }
    }
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
