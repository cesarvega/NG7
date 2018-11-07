import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactUsExternalService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };    
  protected API_URL = 'https://tools.brandinstitute.com/wsPanelMembers/wsPanel.asmx/pm_contactUs';
  constructor(private httpClient: HttpClient) { }

  contacUs(data: any): Observable<any> {
    const bodyString = JSON.stringify(data.value);
    const url = `${this.API_URL}`;
    return this.httpClient.post(url, bodyString, this.httpOptions);
  }
}
