import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any = {};

  constructor(
    private _userService: UserService
  ) {

    this.user = JSON.parse(atob(localStorage.getItem('user')));
    console.log(this.user);
    this.getPlan();
   }

  ngOnInit() {
  }

  getPlan() {
    this._userService.getPlan(this.user.id).subscribe( plan => {
      this.user.plan = plan;

      // Temporário
      this.user.plan.benefits = [
        {
          'name': 'Pontos monitorados',
          'value': 3
        }
      ];
    });
  }

}
