import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question';
import { environment } from '../../environments/environment';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class QuestionDataService {

  private baseUrl: string = environment.baseUrl+"question/";;
  constructor(private httpClient: HttpClient) { }

  // constructor() { }

  getQuestionDetails(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}all`);
  }
  
  addQuestion(questionText: string,surveyId: number): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}add/${questionText}/${surveyId}`, null);
  }

  updateQuestion(qId: number , questionText: string): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}update/${qId}/${questionText}`, null);
  }

  removeById(qId: number) {
    return this.httpClient.delete(`${this.baseUrl}remove/${qId}`);
  }

  getById(qId: number) {
    return this.httpClient.get<Question>(`${this.baseUrl}${qId}`);
  }
}
