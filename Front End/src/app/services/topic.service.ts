import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic } from '../models/topic';
/**
 * Service class for topic module.
 * Conatains all the service methods which connects to the 
 * end points of spring boot APIs.
 */
@Injectable({
  providedIn: 'root'
})
export class TopicDataService {

  private baseUrl: string = environment.baseUrl+"topic/"; //'http://localhost:8070/topic/';
  /**
   * Argumented constructor with a an object of HttpClient to 
   * send and recive data via http.
   * @param httpClient An object of HttpClient.
   */
  constructor(private httpClient: HttpClient) { }
  /**
   * Fetch all the topic from the database via spring boot app. 
   * @returns An Observable which contains all the topic data.
   */
  getAllTopics(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}alltopics`);
  }
  /**
   * Add a new Topic to database via spring boot app with the topic data provied in the templete page. 
   * @param name Name of the topic
   * @param description Description of the topic
   * @param surveyorId  Surveyor username who created the topic.
   * @returns An Observable with newly added topic data.
   */
  addTopic(name: string, description: string, surveyorId: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}addtopic/${name}/${description}/${surveyorId}`, null);
  }
  /**
   * Delete an existing Topic from database via spring boot app with the topic id provied in the templete page. 
   * @param id Id of the topic to be deleted.
   * @returns An Observable with newly added topic data.
   */
  removeTopic(id: number) {
    return this.httpClient.delete(`${this.baseUrl}removetopic/${id}`);
  }
  /**
   * Fetch number of surveys on topic from the database via spring boot app. 
   * @param name Name of the topic
   * @returns An Observable which contains the survey count on topic.
   */
   getSurveyCountOnTopic(name: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}surveycountontopic/${name}`);
  }
  /**
   * Search for a topic in the database via spring boot app with an id provided in the templete page.
   * @param id Id of the topic
   * @returns An Observable with searched topic data.
   */
   searchTopic(id: number) {
    return this.httpClient.get<Topic>(`${this.baseUrl}topicbyid/${id}`);
  }
  /**
   * Update the name of an existing Topic from database via spring boot app with the topic data provied in the templete page.
   * @param id Id of the topic
   * @param name Name of the topic
   * @returns An Observable with updated topic data.
   */
  updateTopicName(id: number, name: string) {
    return this.httpClient.put(`${this.baseUrl}modify/name/${id}/${name}`, null);
  }
  /**
   * Update the description of an existing Topic from database via spring boot app with the topic id 
   * provied in the templete page.
   * @param id Id of the topic
   * @param description Description of the topic
   * @returns An Observable with updated topic data.
   */
  updateTopicDecscription(id: number, description: string) {
    return this.httpClient.put(`${this.baseUrl}modify/description/${id}/${description}`, null);
  }
}