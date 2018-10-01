import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted: boolean = false;
  errorCredentials: boolean = false;

  phone_number = new FormControl('', [
    Validators.required
  ]);

  password = new FormControl('', [
    Validators.required
  ]);

  remember_me = new FormControl('', []);

  formGroupLogin: FormGroup = this.builder.group({
    phone_number: this.phone_number,
    password: this.password,
    remember_me: this.remember_me
  });

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmitLogin() {
    this.submitted = true;

    if ( this.formGroupLogin.valid ) {
      this.authService.login(this.formGroupLogin.value).subscribe(
        (data) => {
          this.router.navigate(['places']);
        },
        (errorResponse: HttpErrorResponse) => {
          if (errorResponse.status === 401) {
            this.errorCredentials = true;
            this.submitted = false;
            setTimeout(() => {
              this.errorCredentials = false;
            }, 5000);
          }
        }
      );

    }

  }

}
