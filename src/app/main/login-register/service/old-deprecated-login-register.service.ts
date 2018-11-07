import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

    
  constructor(private http: HttpClient) { }
  
  private apiCall = 'api/BiFormCreator/';
  private webBaseUrl = 'https://tools.brandinstitute.com/BIWebServices/';
  // private webBaseUrl = 'http://localhost:64378/'
  private completeUrl = this.webBaseUrl + this.apiCall;

  public emailValid;

  private SP_verifyUser = '[BI_MEMBERS].[dbo].[pm_verify_username_and_password] ';
  private _SP_verifyUserEmail = '[BI_MEMBERS].[dbo].[pm_verify_username] ';
  private _SP_verifyIfRegistered = '[BI_MEMBERS].[dbo].[pm_verify_ifregistered] ';
  private _SP_verifyUserPassword = '[RESPONDENTS].[dbo].[pm_verify_password] ';
  private _SP_verifyUsersFirstAndLastName = '[RESPONDENTS].[dbo].[pm_verify_VERIFY_FIRST_N_LASTNAME] ';
  private _SP_verifyDOB = '[RESPONDENTS].[dbo].[pm_verify_DOB] ';
  private _SP_verifyCellPhone = '[RESPONDENTS].[dbo].[pm_verify_CELLPHONE] ';

  private _SP_saveUserProfile = '[BI_MEMBERS].[dbo].[pm_updProfile] ';
  private _SP_getUserProfile = '[BI_MEMBERS].[dbo].[pm_GETProfile] ';

  // private subject: Subject<string>; 
  // public readonly subject: Observable<string>;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  // private options = new RequestOptions({headers: httpOptions.headers });

  // getEmailValidation(data: boolean) {
  //     return this.emailValid 
  // }

  setEmailValidation(data: boolean): void {
      this.emailValid = data;
  }
  saveUserProfile(data): string {
      return this.executeGetSql(this._SP_saveUserProfile , data);
  }
  getUserProfile(email): string {
      return this.executeGetSql(this._SP_getUserProfile , email);
  }
  verifyCellPhone(cellPhone): string {
      return this.executeGetSql(this._SP_verifyCellPhone , cellPhone);
  }
  verifyDob(dob): string {
      return this.executeGetSql(this._SP_verifyDOB , dob);
  }
  verifyFirstAndLastName(firstOrLastName): string {
      return this.executeGetSql(this._SP_verifyUsersFirstAndLastName , firstOrLastName);
  }
  verifyPassword(password): string {
      return this.executeGetSql(this._SP_verifyUserPassword , password);
  }
  verifyEmail(user): string {
      return this.executeGetSql(this._SP_verifyUserEmail , user);
  }
  verifyIfRegistered(user): string {
      return this.executeGetSql(this._SP_verifyIfRegistered , user);
  }

  executeGetSql(sql: string , param: string): any {
      const bodyString = JSON.stringify(sql + '\'' + param + '\''); 
      return this.http.post(this.completeUrl, bodyString, this.httpOptions).subscribe(res => {
        return res;
      });
  }

  signInAndRegistrationAuth(userData): string {
      return this.executeGetSql(this.SP_verifyUser, userData);
  }


  setSocialMedia(socialMediaStr): void {
      // this.socialMediaData = JSON.parse(socialMediaStr);
  }

  getSocialMediaData(retrieveData?): string {
     return '';
  }

}

