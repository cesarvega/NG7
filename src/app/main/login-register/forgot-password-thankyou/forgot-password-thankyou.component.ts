import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
  selector: 'app-forgot-password-thankyou',
  templateUrl: './forgot-password-thankyou.component.html',
  styleUrls: ['./forgot-password-thankyou.component.scss']
})
export class ForgotPasswordThankyouComponent implements OnInit {

  constructor(
    private _fuseConfigService: FuseConfigService,
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
  
  }
}
