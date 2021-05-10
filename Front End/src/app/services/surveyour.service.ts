import { LoginService } from './login.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Surveyor } from '../models/Surveyor';

@Injectable({
  providedIn: 'root'
})
export class SurveyorDataService {

  private baseUrl: string = environment.baseUrl+'surveyor/';
  
  constructor(private httpClient: HttpClient, private loginService: LoginService) { }
 
  getAllSurveyors(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}allsurveyors`);
  }
 
  addSurveyor(surveyor: Surveyor): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}add`, surveyor);
  }

  removeSurveyor(id: number) {
    return this.httpClient.delete(`${this.baseUrl}delete/${id}`,{responseType:"text"});
  }

  updateSurveyor(surveyor: Surveyor) {
    return this.httpClient.put(`${this.baseUrl}update/`, surveyor);
  }
}