import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Department, Employee } from 'src/app/contracts';
import { ShowEmpComponent } from './show-emp.component';

@Injectable({
  providedIn: 'root'
})


export class ShowEmpService {

  constructor(private modal: NgbModal) { }

  add(departments: Department[]): Promise<Employee> {
    const modalRef = this.modal.open(ShowEmpComponent);
    const ci: ShowEmpComponent = modalRef.componentInstance;
    ci.departments = departments;
    return modalRef.result;
  }

  edit(departments: Department[], employee: Employee): Promise<Employee> {
    const modalRef = this.modal.open(ShowEmpComponent);
    const ci: ShowEmpComponent = modalRef.componentInstance;
    ci.employee = employee;
    ci.departments = departments;
    return modalRef.result;
  }
}