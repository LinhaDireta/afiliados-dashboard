import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-btn-checkbox-switch',
  templateUrl: './btn-checkbox-switch.component.html',
  styleUrls: ['./btn-checkbox-switch.component.scss']
})
export class BtnCheckboxSwitchComponent implements OnInit {

  @Input() isChecked: boolean = false;
  @Output() actionCheck = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    console.log(this.isChecked);
  }

  action() {
    console.log(!this.isChecked);
    this.actionCheck.emit(!this.isChecked);
  }

}
