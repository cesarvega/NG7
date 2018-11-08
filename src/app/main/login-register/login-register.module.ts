import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatIconModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { LoginRegisterComponent, DialogContent } from './login-register.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { GoodbayComponent } from './goodbay/goodbay.component';
import { SuccessfulPasswordResetComponent } from './successful-password-reset/successful-password-reset.component';
import { ForgotPasswordThankyouComponent } from './forgot-password-thankyou/forgot-password-thankyou.component';
import { FaqComponent } from './faq/faq.component';
import { FaqService } from './faq/faq.service';
import { AuthGuard } from './service/auth-guard.service';
import { AuthGuardService } from './service/auth.service';
import { MatDialogModule } from '@angular/material/dialog';
import { TellAFriendComponent } from './tell-a-friend/tell-a-friend.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginRegisterComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'thankyou',
    component: ThankyouComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'unsubscribe',
    component: UnsubscribeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'faq',
    component: FaqComponent,
    resolve: {
      faq: FaqService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'successful-password-reset',
    component: SuccessfulPasswordResetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password-success',
    component: ForgotPasswordThankyouComponent
  },
  {
    path: 'goodbay',
    component: GoodbayComponent
  },
  {
    path: 'tell-a-friend',
    component: TellAFriendComponent
  },
  {
    path: 'users',
    loadChildren: '../dynamic-profile/dynamic-profile.module#DynamicProfileModule'
  },
  {
    path: '**',
    redirectTo: 'tell-a-friend'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    FuseSharedModule,
  ],
  declarations: [
    LoginRegisterComponent,
    DialogContent,
    ContactUsComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    UnsubscribeComponent,
    ThankyouComponent,
    GoodbayComponent,
    SuccessfulPasswordResetComponent,
    ForgotPasswordThankyouComponent,
    FaqComponent,
    TellAFriendComponent
  ],
  providers: [
    FaqService, AuthGuard, AuthGuardService
  ], entryComponents: [DialogContent]
})
export class LoginRegisterModule { }
