import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  loginForm: FormGroup;
  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
      private _fuseConfigService: FuseConfigService,
      private _formBuilder: FormBuilder,
      private _authService: AuthService,
      private _loginService: LoginService,
      private toastr: ToastrService,
      private router: Router) {
      // Configure the layout
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
  }
  resetPassword(): void {
    // Validation settings
    if (this.loginForm.value['newPassword'].length < 6) {
      this.loginForm.controls['newPassword'].setErrors({ 'required': true });
    }

    if (this.loginForm.value['newPassword'] !== this.loginForm.value['confirmPassword']) {
      this.loginForm.controls['confirmPassword'].setErrors({ 'required': true });
    }
    if (this.loginForm.value['newPassword'] === this.loginForm.value['oldPassword']) {
      this.loginForm.controls['newPassword'].setErrors({ 'same': true });
      this.loginForm.controls['oldPassword'].setErrors({ 'same': true });
    }


    if (this.loginForm.valid) {  
        const data =  {username: this.loginForm.value.email, oldpassword: this.loginForm.value.oldPassword, newpassword: this.loginForm.value.newPassword };
        this._loginService.changePassword(data).subscribe(x => {        
                if (JSON.parse(x.d)[0].verified) {                    
                    this.toastr.success('password changed');
                    this.router.navigateByUrl('/apps/login/successful-password-reset');
                }
                else {                   
                    this.toastr.warning('Wrong username or password');                    
                }
            });        
        }
   
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    //   this._authService.authState.subscribe((user) => {
    //       this.user = user;
    //       this.loggedIn = (user != null);
    //   });
      
      this.loginForm = this._formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          oldPassword: ['', Validators.required],
          newPassword: ['', Validators.required],
          confirmPassword: ['', Validators.required]
      });
  }
}
