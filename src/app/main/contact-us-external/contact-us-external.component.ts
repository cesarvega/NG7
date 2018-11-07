import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SocialUser, AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { ContactUsExternalService } from './contact-us-external.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contact-us-external',
  templateUrl: './contact-us-external.component.html',
  styleUrls: ['./contact-us-external.component.scss'],
  providers: [AuthService]
})
export class ContactUsExternalComponent implements OnInit {
  reasons = ['Survey Technical Questions/Comments', 'Payment Questions',
    'Website Questions/Comments', 'Profile/Registration Questions Comments'];

  loginForm: FormGroup;
  formErrors: any;
  private _unsubscribeAll: Subject<any>;
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private _contactUsExternalService: ContactUsExternalService
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

    // Reactive form errors
    this.formErrors = {
      emailFrom: {},
      Message: {},
      TypeOfInquiry: {},
      SurveyName: {},
      senderName: {}
    };
  }
  contactUs(): void {
    this._contactUsExternalService.contacUs(this.loginForm).subscribe(x => {
      console.log(x);
      this.router.navigateByUrl('/apps/login/thankyou');
    });
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      emailFrom: ['', [Validators.required, Validators.email]],
      TypeOfInquiry: ['', Validators.required],
      SurveyName: [''],
      senderName: ['', [Validators.required, Validators.minLength(4)]],
      Message: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
}

