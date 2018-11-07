import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig2 } from '../../field.interface';
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html'
})
export class AutocompleteComponent implements OnInit {
  field: FieldConfig2;
  group: FormGroup;
  constructor() {}
  ngOnInit(): void {}
}
