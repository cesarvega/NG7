import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig2 } from '../../field.interface';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styles: []
})
export class SelectComponent implements OnInit {
  field: FieldConfig2;
  group: FormGroup;
  constructor() {}
  ngOnInit(): void {}
}
