import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private SP_verifyUser = '[BI_MEMBERS].[dbo].[pm_verify_username_and_password] ';
  private _SP_saveUserProfile = '[BI_MEMBERS].[dbo].[pm_updProfile] ';
  private _SP_verifyUserEmail = '[BI_MEMBERS].[dbo].[pm_verify_username] ';
  private _SP_getSurveySummary = '[BI_MEMBERS].[dbo].[pm_getSummary] ';
  protected API_URL = 'https://tools.brandinstitute.com/BIWebServices/' + 'api/BiFormCreator/';

  protected ASMX_URL_UpdateProfile = 'https://tools.brandinstitute.com/wsPanelMembers/wsPanel.asmx/pm_updProfile';
  protected ASMX_URL_VerifyUserName = 'https://tools.brandinstitute.com/wsPanelMembers/wsPanel.asmx/pm_verify_username';
  protected ASMX_URL_ChangePassword = 'https://tools.brandinstitute.com/wsPanelMembers/wsPanel.asmx/pm_changePassword';
  protected ASMX_URL_Verify_username_and_password = 'https://tools.brandinstitute.com/wsPanelMembers/wsPanel.asmx/pm_verify_username_and_password';

  constructor(private httpClient: HttpClient) { }

  // get  all Users 
  getUsers(): Observable<any> {
    return this.httpClient.get(`${this.API_URL}`);
  }

  // get User by id
  getUser(id: string): Observable<any> {
    const url = `${this.API_URL}/edit/${id}`;
    return this.httpClient.get(url);
  }

  // register un nuevo User 
  getSurveySummary(username: string): Observable<any> {
    const bodyString = JSON.stringify(this._SP_getSurveySummary + '\'' + username + '\'');
    const url = `${this.API_URL}`;
    return this.httpClient.post(url, bodyString, this.httpOptions);
  }

  postUser(data: any): Observable<any> {
    const bodyString = JSON.stringify({fields: data});
    return this.httpClient.post(this.ASMX_URL_UpdateProfile, bodyString, this.httpOptions);
  }

  // register un nuevo User 
  verifyEmail(data: any): Observable<any> {    
    const bodyString = JSON.stringify({username: data});
    return this.httpClient.post(this.ASMX_URL_VerifyUserName, bodyString, this.httpOptions);
  }

  // update Users by id 
  // remplazar any por el tipo de variable para esto creamos un model clase que represente el data que vamos update
  updateUser(id: string, data: any): Observable<any> {
    const url = `${this.API_URL}/update/${id}`;
    return this.httpClient.post(url, data);
  }

  // borrar appoinmnets 
  deleteUser(id: string): Observable<{}> {
    const url = `${this.API_URL}/delete/${id}`;
    return this.httpClient.get(url);
  }

  signAndRegistrationAuth(data: any): Observable<any> {
    data = data.split(',');
    const bodyString = JSON.stringify( {username: data[0], password: data[1]});
    const url = `${this.API_URL}`;
    return this.httpClient.post(this.ASMX_URL_Verify_username_and_password, bodyString, this.httpOptions);
  }

  changePassword(data: any): Observable<any> {
    const bodyString = JSON.stringify(data);
    const url = `${this.API_URL}`;
    return this.httpClient.post(this.ASMX_URL_ChangePassword, bodyString, this.httpOptions);
  }
}

