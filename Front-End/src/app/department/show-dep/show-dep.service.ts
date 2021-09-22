import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from 'src/app/contracts';
import { ShowDepComponent } from './show-dep.component';

@Injectable({
  providedIn: 'root'
})
export class ShowDepService {

  constructor(private modal: NgbModal) { }

  add(): Promise<Department> {
    const modalRef = this.modal.open(ShowDepComponent);
    return modalRef.result;
  }

  edit(department: Department): Promise<Department> {
    const modalRef = this.modal.open(ShowDepComponent);
    const ci: ShowDepComponent = modalRef.componentInstance;
    ci.department = department;
    return modalRef.result;
  }

}
