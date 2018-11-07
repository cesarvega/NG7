import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialUser, AuthService } from 'angularx-social-login';
@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {
  loginForm: FormGroup;
  private user: SocialUser;
  private loggedIn: boolean;
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
  }
  retrievePassword(): void {
    console.log('contact us');
  }
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [{value: 'cvega@brandinstitute.com', disabled: true}, [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }
}
