import { Component, OnInit } from '@angular/core';
import { Feedback } from '../models/Feedback';
import { FeedbackDataService } from '../services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  allFeedbacks: Feedback[] = [];
  //tempFeedback: Feedback = new Feedback();
  searchResponce: Feedback = new Feedback();
  searchKey: number| string;
  isSearched: boolean = false;
  heading: string = "All Feedbacks";
  searchResult: string;
  isFound: boolean;
  displayFeedback: boolean = true;
  //isAdding: boolean = false;

  constructor(private feedback: FeedbackDataService){}

  searchFeedback(SearchKey: number| string): void{
    this.searchResponce = undefined;
    this.isFound = false;
    this.searchResult = "No match found!!";
    this.heading="Search results";
    this.isSearched=true;
    this.displayFeedback = false;
    for( let feedback of this.allFeedbacks)
    {
      if(SearchKey == feedback.id){
        this.searchResponce = feedback;
      }
    }
    if(typeof this.searchResponce != 'undefined'){
      this.searchResult= "Match found!!";
      this.isFound = true;
    }
  }
  toogleDisplay(){
    this.isSearched = false;
    this.displayFeedback = true;
    this.heading = "All Feedbacks";
    this.ngOnInit();
  }
  showForm(){
    this.displayFeedback = false;
    this.isSearched = false;
  }

  ngOnInit(): void {
    this.feedback.getAllFeedback().subscribe(data => this.allFeedbacks = data);
  }
}
