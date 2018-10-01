import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

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

  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _userService: UserService
  ) {

    const user = _auth.getUser();

    if (!user) {
      _router.navigate(['login']);
    }

    this._userService.getVouchers().subscribe( res => {
      console.log(res);
      this.vouchers = res;
    });
   }

  ngOnInit() {
  }

  sendVoucher(voucher_code) {
    console.log(voucher_code);
    if (voucher_code.length === 0) {
      alertify.error('Informe o voucher.');
    } else {
      console.log(this.vouchers);
      const voucher = this.vouchers.find( el => {
        console.log(el.voucher);
        return el.voucher === voucher_code;
      });

      if (voucher) {
        console.log(voucher);
        if(this.validateVoucher(voucher)) {
          // chamar api
          $('#modal-thankyou').modal('show');
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

}
