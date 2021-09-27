import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { DepartmentRepo } from 'src/app/shared.service';
import { Department } from '../contracts';
import { ShowDepService } from './show-dep/show-dep.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departments: Department[] = [];

  constructor(
    private departmentRepo: DepartmentRepo,
    private showDepService: ShowDepService
  ) { }

  ngOnInit(): void {
    this.departmentRepo.getList().subscribe(
      (departments) => {
        this.departments = departments;
      }
    )
  }

  onAddDepartment() {
    this.showDepService.add().then(department => {
      this.departmentRepo.add(department).subscribe(
        () => { this.departments.push(department) }
      )
    })
  }

  async onEditClick(depId: number) {
    const depIndex = this.departments.findIndex(d => d.Id === depId);
    if (depIndex < 0) {
      throw new Error(`Department with ID ${depId} not found`);
    }
    try {
      const editedDep =  await this.showDepService.edit(this.departments[depIndex]);
      this.departments[depIndex] = editedDep;
      this.departmentRepo.update(editedDep).subscribe()
    } catch (ex) {
      if (ex !== 'cancel') {
        throw ex;
      }
    }
  }

  deleteClick(item:number){
    console.log(item)
    if(confirm("Are you sure?")){
      this.departmentRepo.delete(item).subscribe(data=>{
        this.departmentRepo.getList().subscribe(
          (department)=>{
            this.departments=department;
          }
        );
        alert(data.toString())
      })
    }
  }
}
