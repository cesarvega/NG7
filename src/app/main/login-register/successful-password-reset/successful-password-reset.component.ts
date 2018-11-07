import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
  selector: 'app-successful-password-reset',
  templateUrl: './successful-password-reset.component.html',
  styleUrls: ['./successful-password-reset.component.scss']
})
export class SuccessfulPasswordResetComponent implements OnInit {
  constructor(
    private _fuseConfigService: FuseConfigService,
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
  }
  retrievePassword(): void {
    console.log('contact us');
  }
  ngOnInit(): void {

  }
}
