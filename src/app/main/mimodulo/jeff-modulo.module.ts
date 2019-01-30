import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JeffComponentComponent } from './jeff-component.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
const routes = [
  {
      path     : '**',// esto es que cargue el compente que este aquino neceitas el nombre ya solo **
      component: JeffComponentComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule
  ],
  declarations: [JeffComponentComponent],
  exports     : [
    JeffComponentComponent
  ]
})
export class JeffModuloModule {
  
 }
