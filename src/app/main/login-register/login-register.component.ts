import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AuthGuardService } from './service/auth.service';
import { MatDialog } from '@angular/material';
import { trigger, transition, useAnimation, state, style } from '@angular/animations';
import { shake } from 'ng-animate';
import { ToastrService } from 'ngx-toastr';
import { resultMemoize } from '@ngrx/store';

@Component({
    selector: 'app-login-register',
    templateUrl: './login-register.component.html',
    styleUrls: ['./login-register.component.scss'],
    providers: [AuthService, LoginService],
    animations: [
        trigger('bounce',
            [transition('nobounce => bounce', useAnimation(shake, {
                params: { timing: 0.2, delay: 0.3 }
            }))
            ])
    ],
})

export class LoginRegisterComponent implements OnInit {
    loginForm: FormGroup;
    private user: SocialUser;
    public isUser = false;
    public harlemShake = true;
    checked = false;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _authGuardService: AuthGuardService,
        private toastr: ToastrService,
        private _LoginService: LoginService,
        public dialog: MatDialog,
        private router: Router
    ) {
        // Configure the layout
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

    signInWithBI(user?: SocialUser): void {
        this.harlemShake = false;
        if (user) {
            this.loginForm.value.email = user.email;
            this.loginForm.value.password = user.id;
        }
        this._LoginService.login({ email: this.loginForm.value.email.toLowerCase(), password: this.loginForm.value.password }).subscribe(res => {
            console.log(res);
            localStorage.setItem('token', res.id);
            this._LoginService.getUser(res.id).subscribe(resul => {
                localStorage.setItem('user', JSON.stringify(resul));
                localStorage.setItem('username', resul.username);
                localStorage.setItem('email', resul.email);
                localStorage.setItem('rememberme', 'true');
            });
            if (this._authGuardService.login()) {
                this.router.navigateByUrl('/profile');
                setTimeout(() => {
                    this.toastr.success('Welcome ' + localStorage.getItem('username'));
                }, 1000);
            } else {
                this._authGuardService.logout();
            }

        }, err => {
            console.log(err.error.error);
            this.harlemShake = true;
            this.toastr.warning(err.error.error.message + ' username or password incorrect');
        });
    }
    signInWithGoogle(): void {
        this._authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
            this.signInWithBI(user);
        });
    }
    signInWithFB(): void {
        this._authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
            this.signInWithBI(user);
        });
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(DialogContent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
    ngOnInit(): void {
        this._authGuardService.logout();
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

}

@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'dialog-content.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogContent {

}

