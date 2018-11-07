import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { ItemsComponent } from './items.component';
import { ItemsProfileComponent } from './items-profile/items-profile.component';


const routes = [
  {
    path: 'profile',
    component: ItemsProfileComponent
  },
  {
    path: '**',
    component: ItemsComponent
  }
];

@NgModule({
  declarations: [
    ItemsComponent, ItemsProfileComponent
  ],
  imports: [
    RouterModule.forChild(routes),

    TranslateModule,

    FuseSharedModule
  ]
})
export class ItemsModule { }
