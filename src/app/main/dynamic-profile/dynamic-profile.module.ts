import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicProfileComponent } from './dynamic-profile.component';
import { MaterialModule } from './material.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { SelectComponent } from './components/select/select.component';
import { DateComponent } from './components/date/date.component';
import { RadiobuttonComponent } from './components/radiobutton/radiobutton.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';

import { FuseSharedModule } from '@fuse/shared.module';
import { LabelComponent } from './components/textlabel/textlabel.component';
import { RegistrationFormComponent } from '../login-register/registration-form/registration-form.component';
import { ProfileComponent } from '../login-register/profile/profile.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
const routes: Routes = [
  {
    path     : 'user/profile',
      component: ProfileComponent
  },
  {
    path     : 'auth/register',
    component: RegistrationFormComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FuseSharedModule
  ],
  declarations:   [
    ProfileComponent,
    AutocompleteComponent,
    RegistrationFormComponent,
    DynamicProfileComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    LabelComponent,
    DynamicFieldDirective,
    DynamicFormComponent
  ],
   entryComponents: [
    AutocompleteComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    LabelComponent
]
})
export class DynamicProfileModule { }
