import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsExternalComponent } from './contact-us-external.component';
import { Routes, RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, 
  MatDialogModule, MatExpansionModule, MatIconModule, MatOptionModule, MatSelectModule } from '@angular/material';
const  routes: Routes = [
  {
    path: '**',
    component: ContactUsExternalComponent,
  }];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
  ],
  declarations: [ ContactUsExternalComponent ]
})
export class ContactUsExternalModule {   

}


