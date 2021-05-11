import { TopicDataService } from './../services/topic.service';
import { Component, OnInit } from '@angular/core';
import { Topic } from '../models/topic';
/**
 * This is a componnet class for topic module,
 * It changes and maintains the topic componnet and template and add certain
 * behaviour of the topic page.  
 */
@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  allTopics: Topic[] = [];
  tempTopic: Topic = new Topic();
  searchResponce: Topic = new Topic();
  searchKey: number | string;
  isSearched: boolean = false;
  heading: string = "All Topics";
  searchResult: string;
  isFound: boolean;
  displayTopic: boolean = true;
  isAdding: boolean = false;
  isUpdating: boolean = false;
  topicId: number;
  /**
   * Argumented constructor with topic service module injected.
   * @param topic object of TopicDataService to perform all service related actions.
   */
  constructor(private topic: TopicDataService) { }

  /**
   * Add a new topic into the databse via springboot app 
   * with the data provided in add topic form.
   */
  addTopic(): void {
    this.topic.addTopic(this.tempTopic.name, this.tempTopic.description, this.tempTopic.surveyorId).subscribe(
      response => {
        window.alert(`Hooray!! A new topic added successfully.`);
        this.ngOnInit();
      },
      error => window.alert(`Topic addition failed. Either topic name already exists or invalid surveyor user ID`)
    );
    this.toogleDisplay();
  }
  /**
   * Remove a perticular topic of which id is provided from the data via springboot app.
   * NOTE: It's not a DOM deletion, the topic data will be lost permanently.
   * @param id Id of the topic to be deleted from the database.
   */
  removeTopic(id: number): void {
    if (window.confirm(`Sure you want to delete topic with id: ${id}??`)) {
      this.topic.removeTopic(id).subscribe();
      window.alert(`Topic with id: ${id} deleted successfully.`);
      this.ngOnInit();
    }
  }
  /**
   * Modify/Update an existing topic into the databse via springboot app 
   * with the data provided in update topic form.
   */
  updateTopic() {
    for (let topic of this.allTopics) {
      if (this.tempTopic.id == topic.id && this.tempTopic.name != topic.name) {
        this.topic.updateTopicName(this.tempTopic.id, this.tempTopic.name).subscribe(
          response => {
            window.alert(`Yeahhhh!! Topic with id:${this.tempTopic.id} updateded successfully.`);
            this.topic.updateTopicDecscription(this.tempTopic.id, this.tempTopic.description).subscribe();
            this.ngOnInit();
          },
          error => {
            window.alert(`The topic name you entered already exist.`);
            this.ngOnInit();
          }
        );
      }
    }
    this.topic.updateTopicDecscription(this.tempTopic.id, this.tempTopic.description).subscribe();
    this.toogleDisplay();
    this.ngOnInit();
  }
  /**
   * A method from OnInit interface which will run at the time of initialization
   * of this class.
   * It fetch all the topic recored from the database via springboot app.
   */
  ngOnInit(): void {
    this.topic.getAllTopics().subscribe(data => this.allTopics = data);
  }
  /**
   * Decides when to show all the topic in the page.
   */
  toogleDisplay(): void {
    this.isSearched = false;
    this.displayTopic = true;
    this.isAdding = false;
    this.isUpdating = false;
    this.heading = "All Topics";
    this.ngOnInit();
  }
  /**
   * Display the add topic module/form in the page.
   */
  showAddForm(): void {
    this.displayTopic = false;
    this.isSearched = false;
    this.isUpdating = false;
    this.isAdding = true;
    this.heading = "Add topic";
  }
  /**
   * Display the update topic module/form in the page and store the topic id
   * of which updation is asked for.
   * @param id topic id of which updation is requied.
   */
  showUpdateForm(id: number): void {
    this.displayTopic = false;
    this.isSearched = false;
    this.isAdding = false;
    this.isUpdating = true;
    this.heading = "Update topic";
    this.tempTopic.id = id;
  }
  /**
   * This method will search a perticular topic and show it on the template.
   * @param SearchKey The key for searching a topic
   */
  searchTopic(SearchKey: number | string): void {
    this.searchResponce = undefined;
    this.isFound = false;
    this.searchResult = "No match found!!";
    this.heading = "Search results";
    this.isSearched = true;
    this.displayTopic = false;
    this.isUpdating = false;
    this.isAdding = false;
    for (let topic of this.allTopics) {
      if (SearchKey == topic.id || SearchKey == topic.name) {
        this.searchResponce = topic;
      }
    }
    if (typeof this.searchResponce != 'undefined') {
      this.searchResult = "Match found!!";
      this.isFound = true;
    }
  }
}
