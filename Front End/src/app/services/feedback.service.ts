import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/Feedback';
@Injectable({
  providedIn: 'root'
})
export class FeedbackDataService {

  private baseUrl: string = 'http://localhost:8070/feedback/';
  constructor(private httpClient: HttpClient) { }

  // constructor() { }

  getAllFeedback(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}all`);
  }

  searchFeedback(id: number) {
    return this.httpClient.get<Feedback>(`${this.baseUrl}feedbacksbyid/${id}`);
  }

  addFeedback(pid: number, sid: number, qid: number,opt: string) {
    console.log(`${this.baseUrl}addFeedback/${pid}/${sid}/${qid}/${opt}`);
    return this.httpClient.post<Feedback>(`${this.baseUrl}addFeedback/${pid}/${sid}/${qid}/${opt}`,null);
    
  }
}
