import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-card',
  templateUrl: './alert-card.component.html',
  styleUrls: ['./alert-card.component.scss']
})
export class AlertCardComponent implements OnInit {

  @Input() alert: any = {};

  constructor() { }

  ngOnInit() {
  }

}
