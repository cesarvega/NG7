import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldGroupConfig, FieldConfig2 } from './field.interface';


@Component({
  selector: 'dynamic-profile',
  templateUrl: './dynamic-profile.component.html',
  styleUrls: ['./dynamic-profile.component.scss']
})
export class DynamicProfileComponent implements OnInit {
  tabConfig: FieldGroupConfig[];
  @Input() fieldData: any;
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() taken: EventEmitter<any> = new EventEmitter<any>();
  @Output() paypal: EventEmitter<any> = new EventEmitter<any>();
  countChange(event): void {
    this.submitForm.emit(event);
  }
  emailtaken(event): void {
    this.taken.emit(event);
  }

  paypalveryfication(event): void {
    this.paypal.emit(event);
  }

  ngOnInit(): void {
    this.tabConfig = this.fieldData;
    setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 20);
  }
}
