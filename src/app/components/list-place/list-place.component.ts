import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-place',
  templateUrl: './list-place.component.html',
  styleUrls: ['./list-place.component.scss']
})
export class ListPlaceComponent implements OnInit {

  enableMonitoring: boolean = false;
  @Input() place: any = {};

  // output event to open modal edit on parent component
  @Output() editAction = new EventEmitter<boolean>();
  // output event to remove place
  @Output() deleteAction = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
 
  }

  onCheck(value: boolean) {
    console.log('OnClick:', value);
    this.enableMonitoring = value;
  }

  onEditAction() {
    this.editAction.emit(this.place);
  }

  onDeleteAction() {
    this.deleteAction.emit(this.place);
  }

}
