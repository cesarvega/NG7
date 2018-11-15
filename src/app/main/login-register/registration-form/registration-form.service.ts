import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegistrationFormService {

  protected API_URL = 'https://miami-xqrrddyiuz.now.sh/form-fields?filter[offset]=0&filter[limit]=100&filter[skip]=0';
  // protected API_URL = 'https://nodeapp-vvhqljanyq.now.sh/info';
  protected API_URL2 = 'https://nodeappcesar.herokuapp.com/api/bi-surveys?filter[where][surveyName]=CAMPAIGNS_ENDO';
  protected API_URL3 = 'https://nodeappcesar.herokuapp.com/api/Users';
  // protected API_URL = 'http://localhost:433/info';
  constructor(private httpClient: HttpClient) {}

 // get  all Infos 
  getFromFields(): Observable<any> {
    return this.httpClient.get(`${this.API_URL2}`);
  }

  // get FromField by id
  getFromField(id: string): Observable<any> {
    const url = `${this.API_URL}/edit/${id}`;
    return this.httpClient.get(url);
  }

   // poner nuevo FromField 
  postFromField(data: any): Observable<any> {
    const url = `${this.API_URL}/set/`;
    return this.httpClient.post(url, data);
  }

  createNewUser(data: any): Observable<any> {
    const url = `${this.API_URL3}`;
    return this.httpClient.post(url, data);
  }

  // update Infos by id 
  // remplazar any por el tipo de variable para esto creamos un modeloose aun clase que represente eld ata que vamos update
  updateInfo(id: string,  data: any): Observable<any> {
    const url = `${this.API_URL}/update/${id}`;
    return this.httpClient.post(url, data);
  }

  // borrar appoinmnets 
  deleteInfo(id: string): Observable<{}> {
    const url = `${this.API_URL}/delete/${id}`;
    return this.httpClient.get(url);
  }
}

