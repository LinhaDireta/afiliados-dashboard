import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

declare var alertify: any;
declare var $: any;

@Component({
  selector: 'app-opt-in',
  templateUrl: './opt-in.component.html',
  styleUrls: ['./opt-in.component.scss']
})
export class OptInComponent implements OnInit {

  voucher: any = '';
  vouchers: any = [];
  showOverlay = false;
  user: User;

  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _userService: UserService
  ) {

    this.user = _auth.getUser();

    if (!this.user) {
      _router.navigate(['login']);
    }

    this._userService.getVouchers().subscribe( res => {
      this.vouchers = res;
    });
   }

  ngOnInit() {
  }

  sendVoucher(voucher_code) {
    if (voucher_code.length === 0) {
      alertify.error('Informe o voucher.');
    } else {

      const voucher = this.vouchers.find( el => {
        return el.voucher === voucher_code;
      });

      if (voucher) {
        if(this.validateVoucher(voucher)) {
          this.updateUser();
        } else {
          const expires = new Date(voucher.expires);
          alertify.error(`Esse voucher expirou em ${expires.toLocaleDateString()}`);
        }

      } else {
        alertify.error('Voucher inválido');
      }
      
    }
  }

  validateVoucher(voucher) {
    const d = new Date();
    const expires = new Date(voucher.expires);

    return (expires > d);
  }

  updateUser() {

    const plan_id = 2;
    this._userService.update({ 'plan_id': plan_id}, this.user.id).subscribe( res => {
      if(res) {
        this.user.plan_id = plan_id;
        localStorage.setItem('user', btoa(JSON.stringify(this.user)));
        $('#modal-thankyou').modal('show');
      }
    }, err => {
      alertify.error('Ocorreu um erro inesperado, por fvor tente mais tarde');
    });
  }

}
