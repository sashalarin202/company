import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Department, Employee } from 'src/app/contracts';


@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {
  @Input() employee!: Employee;
  @Input() departments!: Department[];

  form: FormGroup = this.fb.group({
    Id: 0,
    DepartmentId: [null, Validators.required],
    Name: ['', Validators.required]
  });

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.employee) {
      this.form.setValue(this.employee);
    }
  }

  onSave() {
    this.activeModal.close(this.form.value);
  }
}
