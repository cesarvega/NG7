import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { FakeDbService } from 'app/fake-db/fake-db.service';
import { AppComponent } from 'app/app.component';
import { AppStoreModule } from 'app/store/store.module';
import { LayoutModule } from 'app/layout/layout.module';
import { APP_BASE_HREF } from '../../node_modules/@angular/common';
import { LoginOpt, SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
const providers = {
    'google': {
        'clientId': '602575723314-jdm4nunt3bl3kts5pt422dkfoecdqi70.apps.googleusercontent.com'
    },
    'linkedin': {
        'clientId': '78boqsci07651u'
    },
    'facebook': {
        'clientId': '412970612378155', // new api
        // "clientId": "333641403720580",
        'apiVersion': 'v2.9' // like v2.4 
    }
};
const fbLoginOptions: LoginOpt = {
    scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
    return_scopes: true,
    enable_profile_selector: true
}; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11

const googleLoginOptions: LoginOpt = {
    scope: 'profile email'
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig

const config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(providers.google.clientId)
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(providers.facebook.clientId)
    },
    // {
    //   id: LinkedInLoginProvider.PROVIDER_ID,
    //   provider: new LinkedInLoginProvider(providers.linkedin.clientId, false, 'en_US')
    // }
]);

export function provideConfig(): AuthServiceConfig {
    return config;
}
import { MainModule } from './main/main.module';

const appRoutes: Routes = [
    {
        path: '**',
        redirectTo: 'main'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),
        ToastrModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        SocialLoginModule,
        LayoutModule,
        AppStoreModule,
        MainModule,

        // firebase
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule
    ],
    bootstrap: [
        AppComponent
    ],
    // providers: [{ provide: APP_BASE_HREF, useValue: '/corporate/'}, 
    providers: [{ provide: APP_BASE_HREF, useValue: '/ng7/' },
    { provide: AuthServiceConfig, useFactory: provideConfig }
    ]
})
export class AppModule {
}
