import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-place',
  templateUrl: './list-place.component.html',
  styleUrls: ['./list-place.component.scss']
})
export class ListPlaceComponent implements OnInit {

  enableMonitoring: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onCheck(value: boolean) {
    console.log('OnClick:', value);
    this.enableMonitoring = value;
  }

}
