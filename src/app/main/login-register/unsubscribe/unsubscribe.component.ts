import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialUser, AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss']
})
export class UnsubscribeComponent implements OnInit {
  loginForm: FormGroup;
  private user: SocialUser;
  formErrors: any;
  reasons = ['Lack of surveys', 'I do not have the time', 'Compensation too low', 'Other -- please specify']; 

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: false
        },
        toolbar: {
          hidden: false
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
    this.formErrors = {
      emailFrom: {},
      reasonwhy: {},
      Message: {}    
    };
  }

  unsubscribe(): void {
    console.log('unsubscribed');
    this.router.navigateByUrl('/apps/login/goodbay');
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      emailFrom: ['', [Validators.required, Validators.email]],
      reasonwhy: ['', Validators.required],
      Message: ['']
    });
  }

}
