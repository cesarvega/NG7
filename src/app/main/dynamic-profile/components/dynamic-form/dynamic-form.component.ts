import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FieldConfig2, Validator } from '../../field.interface';
import { LoginService } from '../../../login-register/login.service';

@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styles: []
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldConfig2[] = [];

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() emailTaken: EventEmitter<any> = new EventEmitter<any>();
  @Output() paypal: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  noValid = false;


  get value(): void {
    return this.form.value;
  }
  constructor(private fb: FormBuilder, private _biLoginService: LoginService) { }

  ngOnInit(): void {
    this.form = this.createControl();
  }

  onSubmit(event: Event): void {
    this.noValid = false;
    event.preventDefault();
    event.stopPropagation();

    if (this.form.value['Select country of residency *'] === 'United States' || this.form.value['Select country of residency *'] === 'Canada') {
      if (this.form.value['State/Province'].length === 0 || this.form.value['Zip Code'].length === 0) {
        this.paypal.emit('You must provide a state and zip-code if you are in USA or Canada');
        return;
      }
    }

    if (this.form.value['Password *']) { // if coming from registration it will be a password
      if (this.form.value['Password *'].length < 6) {
        this.form.controls['Password *'].setErrors({ 'min': true });
      }
      if (this.form.value['Password *'] !== this.form.value['confirm password *']) {
        this.form.controls['confirm password *'].setErrors({ 'required': true });
        
      }
      this._biLoginService.verifyEmail(this.form.controls['Email *'].value).subscribe((x: any) => {
        // if (true) {
        if (!JSON.parse(x.d)[0].verified) {
          this.emailTaken.emit('the email ' + this.form.controls['Email *'].value + ' is already taken');
          this.noValid = true;
          return true;
        }
        else {
          if (this.form.valid) {
            this.submitForm.emit(this.form.getRawValue());
          } else {
            this.noValid = true;
            this.validateAllFormFields(this.form);
          }
        }
      });
    }
    else {
      if (this.form.valid) {
        if (this.form.value['Select preferred payment method *'] === 'PayPal') {
          this.paypal.emit('Please double-check and confirm that your PayPal account email is spelled correctly');
          if (this.form.value['Enter your PayPal account'].length === 0) {
            this.paypal.emit('Please enter a valid account');
            return;
          }
        }
        this.submitForm.emit(this.form.getRawValue());
      } else {
        this.noValid = true;
        this.validateAllFormFields(this.form);
      }
    }

  }

  createControl(): FormGroup {
    const group = this.fb.group({});
    this.fields.forEach(field => {
      if (field.type === 'button') { return; }
      const control = this.fb.control(
        { value: field.value, disabled: (field.disabled === 'false') ? false : true },
        this.bindValidations(field.validations || [])
      );
      group.addControl(field.name, control);
    });
    return group;
  }

  bindValidations(validations: any): any {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
