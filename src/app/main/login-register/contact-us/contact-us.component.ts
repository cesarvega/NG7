import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialUser, AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { ContactUsExternalService } from '../../contact-us-external/contact-us-external.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  providers: [AuthService]
})
export class ContactUsComponent implements OnInit {
  reasons = ['Survey Technical Questions/Comments', 'Payment Questions', 
              'Website Questions/Comments', 'Profile/Registration Questions Comments']; 

  loginForm: FormGroup;
  formErrors: any;
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private router: Router,    
    private _contactUsExternalService: ContactUsExternalService
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

