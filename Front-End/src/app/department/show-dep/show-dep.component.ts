import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from '../../contracts';


@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  @Input() department!: Department;
  @Input() title = '';

  form: FormGroup = this.fb.group({
    Id: 0,
    Name: ['', Validators.required]
  });

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.department) {
      this.form.setValue(this.department);
    }
  }

  onSave() {
    this.activeModal.close(this.form.value);
  }

  onCancel() {
    this.activeModal.dismiss('cancel');
  }
}
