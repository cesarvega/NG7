import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialUser, AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { ContactUsExternalService } from '../../contact-us-external/contact-us-external.service';
@Component({
  selector: 'app-tell-a-friend',
  templateUrl: './tell-a-friend.component.html',
  styleUrls: ['./tell-a-friend.component.scss']
})
export class TellAFriendComponent implements OnInit {
  reasons = ['Dr.',	'Mr.',	'Mrs.',	'Ms.', 'Prof.']; 
  fileds = ['Doctor', 'Nurse', 'Pharmacist', 'Paramedic', 'Other', 'Consumer', ]; 
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
      email: {},
      message: {}
      // title: {},
      // firstName: {},
      // lastName: {},
      // field: {},
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
      email: ['', [Validators.required, Validators.email]],
      message: ['']
      // title: ['', Validators.required],
      // firstName:  ['', Validators.required],
      // lastName:  ['', Validators.required],
      // field: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
}

