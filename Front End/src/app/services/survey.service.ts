import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyDataService {

  private baseUrl: string = environment.baseUrl + 'survey/';
  constructor(private httpClient: HttpClient) { }

  // constructor() { }

  getAllSurveys(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}allsurveys`);
  }


  addSurvey(survey: Survey): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}add`, survey);
  }

  updateSurvey(surveyId: number, description: string): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}update/${surveyId}/${description}`, null);
  }


  removeSurvey(id: number) {
    return this.httpClient.delete(`${this.baseUrl}remove/${id}`);
  }

  closesurvey(id: number) {
    return this.httpClient.put(`${this.baseUrl}close/${id}`,null);
  }
}
