import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-jeff-component',
  templateUrl: './jeff-component.component.html',
  styleUrls: ['./jeff-component.component.scss']
})
export class JeffComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export class ProfileEditorComponent {
  profileForm = new FormGroup({
    Form: new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    })
  });
 
  constructor(private fb: FormBuilder) { }
}
