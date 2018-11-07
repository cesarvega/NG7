import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FieldConfig2 } from '../../dynamic-profile/field.interface';
import { Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider, AuthService, SocialUser } from 'angularx-social-login';
import { RegistrationFormService } from './registration-form.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  providers: [RegistrationFormService]
})
export class RegistrationFormComponent implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;
  public counter = 0;
  public _finalObj: Array<any> = [];
  public _guidProvider: Array<any> = [
    { key: '730a46ec-7421-48d4-bf84-889987183d62', labelValue: 'Email *' },
    { key: '5642371b-98b4-4523-88d5-cab150c382cb', labelValue: 'Password *' },
    { key: 'df7f9a14-4e9c-4424-ad84-24841e646024', labelValue: 'confirm password *' },
    { key: 'ee545345-b161-4f21-b271-0aad1b5b52e2', labelValue: 'First name *' },
    { key: 'befbacc2-2bab-4c81-b4f2-0dd8fd21a73b', labelValue: 'Middle name' },
    { key: 'ea6901fd-291c-4e40-a3fd-248ed3ee3ee0', labelValue: 'Last name *' },
    { key: '9239754c-b761-4574-8d9f-be5ab731a0ff', labelValue: 'Gender *' },
    { key: 'c732c668-bae3-4f68-aef2-b6728763d72e', labelValue: 'Select preferred payment method *' },
    { key: 'c24cc67a-b0cf-44f5-991a-bd0c18cf7301', labelValue: 'Date of birth *' },
    { key: '092f310f-b639-4ab5-822b-d0bdee9910c3', labelValue: 'Select country of residency *' },
    { key: '7da874b7-ee7a-4e74-a627-30d70f598494', labelValue: 'Mailing street address *' },
    { key: '0d1d3494-4939-49d7-bdbe-15eb48e923ab', labelValue: 'Mailing street/#apto/unit' },
    { key: 'b5c9d2ee-69a8-45d2-b50f-c5ad21310d23', labelValue: 'State/Province' },
    { key: '19fde0b9-7162-41a1-9f79-8e33bec336a5', labelValue: 'Zip Code *' },
    { key: '8933a8ed-9b7a-40a6-a234-478765560187', labelValue: 'Cellphone *' },
    { key: 'f20bc868-a9ba-45d3-9918-270806149a8b', labelValue: 'Specify your profession or occupation' },
    { key: 'efcfa33d-efb0-43e8-8e51-23508ddedc39', labelValue: 'Type of industry *' },
    { key: '81d74098-5efd-4fc9-afce-88b98f745a23', labelValue: 'Title position *' },
    { key: 'bcf8eea5-1b82-4452-8304-8c588c490ef9', labelValue: 'Level of Education' },
    { key: '1af4efa7-e4cb-469a-80ed-5220822eb025', labelValue: 'Spoken Languages' },
    { key: 'aaf1817d-e859-4302-805a-4938c47f1bb5', labelValue: 'Employer name' },
    { key: '2782cff3-b858-49e9-ba2a-ac578eaa8529', labelValue: 'Profession or Occupation *' },
    { key: '610db51c-fbf8-48d9-ba2d-25815c80a459', labelValue: 'Practice type *' },
    { key: '38cf04f2-5b63-4f6d-936e-d8e82ab0ef6a', labelValue: 'University/College' },
    { key: '10cdd4cd-d5b9-4301-b643-099f40c5a69d', labelValue: 'License number' },
    { key: '8f6233f8-5893-4bdc-8caa-cb67a6339c68', labelValue: 'License State/Province' },
    { key: '0cd19633-9baf-4d39-9cff-b61cea58d5f2', labelValue: 'You must provide proof of your medical profession' },
    { key: 'a1689b67-c51e-422a-8b87-1df5d9990a77', labelValue: 'Primary specialty *' },
    { key: '39da4b11-c640-434b-b336-041a4bb723ee', labelValue: 'Secondary specialty' },
    { key: 'b50131a1-b728-4bf4-ad36-bcc35c6fdc27', labelValue: 'Tertiary specialty' },
    { key: '52381c41-f118-4d74-83e6-4930078a5530', labelValue: 'Degree date *' },
    { key: 'df40615d-6c77-46cf-be05-f182ee8a35b7', labelValue: 'University/College' },
    { key: '23366508-c9a6-472d-bbb5-72d95ebca444', labelValue: 'License number' },
    { key: '590ee3b5-6827-4582-8ac1-704f4506f967', labelValue: 'License State/Province' },
    { key: 'a6f1b8d1-a0ea-420a-9ad2-12e77cb0100d', labelValue: 'Enter Board name (if applies)' },
    { key: '55235e14-e438-45cf-99bd-789773c0c697', labelValue: 'You must provide proof of your medical profession' },
    { key: 'fa7c5a61-0bc0-48e2-a5e9-f6814d661971', labelValue: 'Practice type *' },
    { key: '609b81c9-2d37-4a87-a071-5e8de1f06ee2', labelValue: 'Degree date *' },
    { key: '6595ff08-7458-4209-ab61-37768d3061fe', labelValue: 'University/College' },
    { key: '6bb8aa1c-03fd-44db-a1a3-10bd1c5d08fd', labelValue: 'License number' },
    { key: 'db5a3520-3eda-43ea-93c3-f3242b586779', labelValue: 'License State/Province' },
    { key: 'c9f8e903-2fd7-479b-a0dc-9b29bcdc60be', labelValue: 'You must provide proof of your medical profession' },
    { key: '49cccba9-257a-47e9-b5dd-45621d78af02', labelValue: 'Practice type *' },
    { key: '558ff75b-6f41-42db-87ad-c4c9a46c33dd', labelValue: 'Nurse Class *' },
    { key: 'bfa1c2f5-e9a9-4137-8f35-a4a73602644b', labelValue: 'License number' },
    { key: 'e1e62fd2-38bf-4838-91f7-9c12f4a9987b', labelValue: 'License State/Province' },
    { key: '1e7ad2f7-39e4-4265-a894-c312d59a2f9f', labelValue: 'You must provide proof of your Nursing profession' },
    { key: '230baf4b-b903-46c7-a579-25b45b4068ef', labelValue: 'Select preferred payment method *' },
    { key: '0ba5d120-83cd-454a-84ac-bbad7db4d702', labelValue: 'Enter your PayPal account' },
    { key: 'a6d17228-a2a5-47c6-9537-fd4c606a27bf', labelValue: 'Select how you want to receive our invitations for surveys *' },
    { key: '3e943c0f-f081-42df-a3c0-8cc372d97266', labelValue: 'to recover your password' },
    { key: '45726a73-595a-45f7-9094-21993160cb02', labelValue: 'Choose a second security question to recover your password' },
    { key: 'a67ec2b1-7482-446c-92ed-1771249b85b6', labelValue: 'Answer the second security question you selected' },
    { key: 'f7388c73-1f37-416a-910a-8c80dd3c96ad', labelValue: 'Choose a security question to recover your password' },
    { key: '1e64873c-4977-415f-813d-c78cd9600d9c', labelValue: 'Answer the question you selected' },
    { key: '715e9115-1769-40a4-8c96-9ee7f2811006', labelValue: 'How did you hear about us?' },
    { key: 'd0566e92-8fc6-47b1-87f0-87a5597fc40c', labelValue: 'surveyHistoryTitle' },
    { key: 'a008ba18-96ab-4df0-9a25-de6f21e4f45f', labelValue: 'paymentHistoryTitle' },
    { key: '1b577495-cd7a-4527-8d8a-61b06714958f', labelValue: 'accHistory' },
    { key: '97e4d9b3-36b5-4cf6-bdfb-4bb9f9640ab7', labelValue: 'accDetails' },
    { key: 'dc9b09cd-8238-42dc-a99e-7bdb5cae7034', labelValue: 'updateInfo' },
    { key: 'e928be20-02eb-48c6-90e5-01bbd1c2e219', labelValue: 'Contact Us' },
    // tslint:disable-next-line:max-line-length
    { key: '5816f764-df23-4315-83b7-d0104ecde1ab', labelValue: 'This section is completely optional, all information provided here will help us better match you with current survey opportunities.' },
    // tslint:disable-next-line:max-line-length
    { key: '35e2b5b7-425c-4696-a706-a5be2c1f1243', labelValue: 'Do you or anyone in your household, or someone for whom you provide care suffer from any of the following medical conditions?'},
    { key: '320c9e9a-65da-4fc0-bf87-d64468992572', labelValue: 'Ethnicity' },
    { key: '04f9afe7-7786-4bfa-b7f1-2fc5fdeea20e', labelValue: 'Education Level' },
    { key: '849d790e-a764-40c5-9099-e36ea5406d0b', labelValue: 'Marital Status' },
    { key: '5fdc3adb-a1c3-4194-8a49-ebc61c15ee25', labelValue: 'Household income' },
    { key: '2ba0c798-4db5-41c5-a597-16e9da8dd182', labelValue: 'Number of children' },
    { key: '08b20841-5e1b-465c-b2ca-b2271617517a', labelValue: 'Do you or any member of your immediate family work in any of the following areas?' },
    { key: '79e746d9-e454-453c-85bd-a007969c7ff5', labelValue: 'Other information: Some questions about your current system configurations' },
    { key: 'd5139a3d-ac03-4732-b62c-7e41d67fd90e', labelValue: 'BI App' },
    { key: '68dc6fa3-8a88-4e3f-acc4-ede4eb4e798b', labelValue: 'SMS/Text' },
    { key: 'd840e65b-9794-4eed-9f2d-8f9ea3d2609e', labelValue: 'Email' },
    { key: '2659adc0-cee0-4e15-8cff-baa2ecc78a7a', labelValue: '' },
    { key: '342838eb-0104-4537-beb8-b6183cb4fa36', labelValue: '' },
    { key: '26ca81d8-5640-40b1-8d0d-c9ef74355f03', labelValue: '' },
    { key: '590fb324-12d7-4cd4-9e61-745fc2dc88ca', labelValue: '' },
    { key: '8c8a84a0-7ddf-4ded-99a3-f183b88d3a34', labelValue: '' },
    { key: '639b6887-dadf-43c3-acf5-f4c3584c5b87', labelValue: '' },
    { key: '57bcf7b1-f033-4d6b-9ddb-c7e804780cb4', labelValue: '' },
    { key: 'de23350f-6413-441c-ae33-cc6645be909c', labelValue: '' },
    { key: 'b0b5df41-2748-4f64-a6f5-11e55d78d8f1', labelValue: '' },
    { key: '6203d50b-6748-45c1-a39b-b33fb5357992', labelValue: '' },
    { key: 'a2d7aa90-42bb-420d-9811-238ca6b6fef6', labelValue: '' },
    { key: 'c4204d65-e43d-4e8c-a96c-ed27b7252c7b', labelValue: '' },
    { key: '29e93222-7bb4-43a3-b325-c5df764ca220', labelValue: '' },
    { key: '269f656c-0209-4724-85b1-0808840d509d', labelValue: '' },
    { key: 'd458ba4e-bfa7-4193-b179-9c5c2d728979', labelValue: '' },
    { key: '7af84c9d-ac0b-4fdc-a43d-7cae364abae1', labelValue: '' },
    { key: 'c30405c8-d919-4736-be9c-447a8900842a', labelValue: '' },
    { key: '26f24881-b994-462c-89ba-257ac0bb3f41', labelValue: '' },
    { key: 'a931c76f-6c88-493c-be55-9b433e0ba701', labelValue: '' },
    { key: '90cd3910-9b6f-495d-93b1-0b2dc8b61a55', labelValue: '' },
    { key: '033a16f5-7310-4059-be54-6438278e49a4', labelValue: '' },
    { key: '629bbfe5-ecf8-4a3a-9df2-4f00de778e62', labelValue: '' },
    { key: '06330bee-b51a-484b-a8fe-ca7e50d61669', labelValue: '' },
    { key: 'bdc947f5-0504-43d3-b15b-80d994782c5e', labelValue: '' }
  ];
  P_info_1: FieldConfig2[] = [
    {
      labelValue: 'Email *',
      icon: '',
      defaultInputValue: '',
      componentType: 'false',
      options: [''],
      disabled: 'false',
      componentId: '0',
      sortOrder: '0',
      tooltip: '',
      placeHolder: 'Enter your email Address',
      type: 'input',
      label: 'Email *',
      name: 'Email *',
      value: '',
      inputType: 'email',
      validations: [
        {
          name: 'pattern',
          validator: Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'),
          message: 'please enter a valid email address'
        },
        {
          name: 'required',
          validator: Validators.required,
          message: 'please enter an email address'
        },
        {
          name: 'taken',
          validator: Validators.required,
          message: 'email address is already taken'
        }
      ]
    },
    {
      labelValue: 'password *',
      icon: '',
      defaultInputValue: '',
      componentType: 'false',
      options: [''],
      disabled: 'false',
      componentId: '0',
      sortOrder: '0',
      tooltip: '',
      placeHolder: 'Enter your password',
      type: 'input',
      label: 'Password *',
      name: 'Password *',
      value: '',
      inputType: 'password',
      validations: [
        {
          name: 'min',
          validator: Validators.minLength(6),
          message: 'please enter 6 characters minimun'
        },
        {
          name: 'pattern',
          validator: Validators.pattern('^[a-zA-Z0-9]{6,20}$'),
          message: 'please enter a valid password no special characters, 6 characters minimun (|,/,*,", ...etc)'
        },
      ]
    },
    {
      labelValue: 'confirm password *',
      icon: '',
      defaultInputValue: '',
      componentType: 'false',
      options: [''],
      disabled: 'false',
      componentId: '0',
      sortOrder: '0',
      tooltip: '',
      placeHolder: 'Enter your confirm password',
      type: 'input',
      label: 'confirm password *',
      name: 'confirm password *',
      value: '',
      inputType: 'password',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'password not matching'
        },
        {
          name: 'pattern',
          validator: Validators.pattern('^[a-zA-Z0-9]{6,20}$'),
          message: 'please enter a valid password no special characters, 6 characters minimun (|,/,*,", ...etc)'
        },
      ]
    },
    {
      labelValue: 'First name *',
      icon: '',
      defaultInputValue: '',
      componentType: 'false',
      options: [''],
      disabled: 'false',
      componentId: '0',
      sortOrder: '0',
      tooltip: '',
      placeHolder: 'Enter your First Name',
      type: 'input',
      label: 'First name *',
      name: 'First name *',
      value: '',
      inputType: 'text',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'please enter first name'
        }
      ]
    },
    {
      icon: '',
      defaultInputValue: '',
      componentType: 'false',
      options: [''],
      disabled: 'false',
      componentId: '0',
      sortOrder: '0',
      tooltip: '',
      placeHolder: 'Enter your Middle Name (Optional)',
      type: 'input',
      label: 'Middle name',
      name: 'Middle name',
      value: '',
      inputType: 'text'
    },
    {
      labelValue: 'Last name *',
      icon: '',
      defaultInputValue: '',
      componentType: 'false',
      options: [''],
      disabled: 'false',
      componentId: '0',
      sortOrder: '0',
      tooltip: '',
      placeHolder: 'Enter your Last Name',
      type: 'input',
      label: 'Last name *',
      name: 'Last name *',
      value: '',
      inputType: 'text',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'please enter last name'
        }
      ]
    },
    {
      icon: '',
      defaultInputValue: '',
      componentType: 'false',
      options: [
        'Female',
        'Male'
      ],
      disabled: 'false',
      componentId: '0',
      sortOrder: '0',
      tooltip: '',
      placeHolder: '',
      type: 'radiobutton',
      label: 'Gender *',
      name: 'Gender *',
      value: '',
      inputType: 'bi-input-radio',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Select your Gender is required'
        }
      ]
    },
    {
      icon: '',
      defaultInputValue: '',
      componentType: 'false',
      options: [
        'PayPal',
        'Check'
      ],
      disabled: 'false',
      componentId: '0',
      sortOrder: '0',
      tooltip: '',
      placeHolder: '',
      type: 'radiobutton',
      label: 'Select preferred payment method *',
      name: 'Select preferred payment method *',
      value: '',
      inputType: 'bi-input-radio',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'please select payment method is required'
        }
      ]
    },
    {
      icon: '',
      defaultInputValue: '1999-06-15',
      componentType: 'false',
      disabled: 'false',
      componentId: '0',
      sortOrder: '0',
      tooltip: '',
      placeHolder: '',
      type: 'date',
      label: 'Date of birth *',
      name: 'Date of birth *',
      value: '',
      inputType: 'date',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'please enter your date of birth is required'
        }
      ]
    },
    {
      icon: 'sql',
      defaultInputValue: '',
      componentType: 'false',
      // tslint:disable-next-line:max-line-length
      options: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire (Ivory Coast)', 'Croatia (Hrvatska)', 'Cuba', 'Curacao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea (North)', 'Korea (South)', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand (Aotearoa)', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'S. Georgia S. Sandwich Isls.', 'Saint Kitts Nevis', 'Saint Lucia', 'Vincent the Grenadines', 'Samoa', 'San Marino', 'Sao Tome Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovak Republic', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'Spain', 'Sri Lanka', 'St. Helena', 'St. Pierre and Miquelon', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen Islands', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City (Holy See)', 'Venezuela', 'Viet Nam', 'Virgin (British)', 'Wallis and Futuna Islands', 'Western Sahara', 'Yemen', 'Zaire', 'Zambia', 'Zimbabwe', 'Zimbabwe'],
      disabled: 'false',
      componentId: '0',
      sortOrder: '0',
      tooltip: '',
      placeHolder: 'Select Country',
      type: 'select',
      label: 'Select country of residency *',
      name: 'Select country of residency *',
      value: '',
      inputType: 'bi-select',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Select your country of residency'
        }
      ]
    }, {
      labelValue: 'Mailing street address 1 *',
      icon: '',
      defaultInputValue: '',
      componentType: 'false',
      options: [''],
      disabled: 'false',
      componentId: '0',
      sortOrder: '0',
      tooltip: '',
      placeHolder: 'Address 1',
      type: 'input',
      label: 'Mailing street address *',
      name: 'Mailing street address *',
      value: '',
      inputType: 'text',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Please provide Mailing Address'
        }
      ]
    }, {
      labelValue: 'Mailing street address 2',
      icon: '',
      defaultInputValue: '',
      componentType: 'false',
      options: [''],
      disabled: 'false',
      componentId: '0',
      sortOrder: '0',
      tooltip: '',
      placeHolder: 'Address 2',
      type: 'input',
      label: 'Mailing street/#apto/unit',
      name: 'Mailing street/#apto/unit',
      value: '',
      inputType: 'text'
    }, {
      labelValue: 'State/Province',
      icon: 'sql',
      defaultInputValue: '',
      componentType: 'false',
      // tslint:disable-next-line:max-line-length
      options: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated states of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Lousiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
      disabled: 'false',
      componentId: '0',
      sortOrder: '0',
      tooltip: '',
      placeHolder: 'State/Province',
      type: 'input',
      label: 'State/Province',
      name: 'State/Province',
      value: '',
      inputType: 'text',
      validations: [
        // {
        //   name: 'required',
        //   validator: Validators.required,
        //   message: 'please select your state/province of residency'
        // }
      ]
    },
    {
      labelValue: 'Zip Code',
      icon: '',
      defaultInputValue: '',
      componentType: 'false',
      options: [''],
      disabled: 'false',
      componentId: '0',
      sortOrder: '0',
      tooltip: '',
      placeHolder: 'ZipCode',
      type: 'input',
      label: 'Zip Code',
      name: 'Zip Code',
      value: '',
      inputType: 'text',
      validations: [
        // {
        //   name: 'required',
        //   validator: Validators.required,
        //   message: 'zip code is required'
        // }
      ]
    },
    {
      labelValue: 'Cell Phone',
      icon: '',
      defaultInputValue: '',
      componentType: 'false',
      options: [''],
      disabled: 'false',
      componentId: '0',
      sortOrder: '0',
      tooltip: 'U.S./Canada can be used to receive our survey texts',
      placeHolder: 'Enter your Cell Phone Number',
      type: 'input',
      label: 'Cellphone *',
      name: 'Cellphone *',
      value: '',
      inputType: 'text',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'cellphone number is required'
        }
      ]
    },
    {
      labelValue: 'Specify your profession or occupation',
      icon: '',
      defaultInputValue: '',
      componentType: 'false',
      options: [
        'Not related to Health Care',
        'Physician/Doctor of Medicine (MD, DO)',
        'Physician Assistant (PA)',
        'Nurse',
        'Pharmacist',
        'Pharmacist Technician',
        'Dentist',
        'Optometrist',
        'Veterinarian',
        'Allied Health Care Profession or Occupation'
      ],
      disabled: 'false',
      componentId: '0',
      sortOrder: '0',
      tooltip: '',
      placeHolder: 'Select Profession/Occupation',
      type: 'select',
      label: 'Specify your profession or occupation',
      name: 'Specify your profession or occupation',
      value: '',
      inputType: '',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Profession is required'
        }
      ]
    }
  ];

  fieldData2 = [
    {
      item: this.P_info_1,
      name: ''
    }
  ];
  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _authService: AuthService,
    private _loginService: LoginService,
    private _route: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _RegistrationFormService: RegistrationFormService
  ) {
    // Configure the layout
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
  }
  fieldOBJ = this.fieldData2;

  paypalVerify(event): void{
    this.toastr.warning(event);
  }
  
  taken(event): void {
    this.showSuccess(event);
  }

  showSuccess(event): void {
    this.toastr.warning(event);
  }

  countChange(event): void {
    this._finalObj = [];
    for (const i in event) {
      if (event.hasOwnProperty(i)) {
        if (i === 'Password *' && this.user) {
          const socialMediaId = (this.user) ? this.user.id.toString() : '';
          event[i] = event[i] + '|' + socialMediaId;
        }
        for (let index = 0; index < this._guidProvider.length; index++) {
          if (i === this._guidProvider[index].labelValue) {
          const obj = { answer: event[i], question: i, componentId: this._guidProvider[index].key };
          this._finalObj.push(obj);
          break;
          }
        }
      }
    }

    // this._RegistrationFormService.postInfo(this._finalObj).subscribe(result => {
    //   this._finalObj = this._finalObj;
    //   localStorage.removeItem('user');
    //   localStorage.setItem('user', JSON.stringify(this._finalObj));
    // });

    this._loginService.postUser(JSON.stringify(this._finalObj)).subscribe(result => {
      this.toastr.success('Account successfully created. Please log in to your new account.');
      setTimeout(() => {        
        this._route.navigateByUrl('/apps/login/auth/login');
      }, 6000);
    });
  }

  signInWithGoogle(): void {
    this._authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      this.setFieldsWithSocialMedia(user);
    });

  }

  signInWithFB(): void {
    this._authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
      this.setFieldsWithSocialMedia(user);
    });

  }

  signOut(): void {
    this._authService.signOut();
  }

  setFieldsWithSocialMedia(user): void {
    this.fieldOBJ[0].item[0].value = user.email;
    this.fieldOBJ[0].item[3].value = user.firstName;
    this.fieldOBJ[0].item[5].value = user.lastName;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    localStorage.setItem('user', '');
    this._authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 20);
  }
}
