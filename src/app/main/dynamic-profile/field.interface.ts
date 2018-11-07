export interface Validator {
  name: string;
  validator: any;
  message: string;
}
export interface FieldConfig {
  label?: string;
  name?: string;
  inputType?: string;
  options?: string[];
  collections?: any;
  type: string;
  value?: any;
  validations?: Validator[];
}

export interface FieldConfig2 {
  labelValue?: string;
  icon?: string;
  defaultInputValue?: string;
  componentType?: string;
  options?:  any[];
  disabled?: string;
  componentId?: string;
  sortOrder?: string;
  tooltip?: string;
  placeHolder?: string;
  type?: string;
  label?: string;
  name?: string;
  value?: string;
  inputType?: string;
  validations?: Validator[];
  
  }

  
export interface FieldGroupConfig {
  item?: FieldConfig2[];
  name?: string;
}
