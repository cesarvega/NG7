import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig2 } from '../../field.interface';
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styles: []
})
export class DateComponent implements OnInit {
  // over 18 yrs old
  maxDate = new Date(2000, 8, 28);
  field: FieldConfig2;
  group: FormGroup;
  constructor() {}
  ngOnInit(): void {}
}
