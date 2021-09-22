import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}


  @Input() title = '';
  @Input() button = '';


  @Output() readonly save = new EventEmitter();
  @Output() readonly cancel = new EventEmitter();
}
