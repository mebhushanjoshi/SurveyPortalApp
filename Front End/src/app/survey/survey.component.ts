import { SurveyDataService } from './../services/survey.service';
import { Component, OnInit } from '@angular/core';
import { Survey } from '../models/survey';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  allsurveys: Survey[] = [];
  tempsurvey: Survey = new Survey();
  searchResponce: Survey = new Survey();
  searchKey: number | string;
  isSearched: boolean = false;
  heading: string = "All Surveys";
  searchResult: string;
  isFound: boolean;
  displaySurvey: boolean = true;
  isAdding: boolean = false;
  isUpdating: boolean = false;

  constructor(private survey: SurveyDataService) { }

  searchSurvey(SearchKey: number | string): void {
    this.searchResponce = undefined;
    this.isFound = false;
    this.searchResult = "No match found!!";
    this.heading = "Search results";
    this.isSearched = true;
    this.displaySurvey = false;
    for (let survey of this.allsurveys) {
      if (SearchKey == survey.id) {
        this.searchResponce = survey;
      }
    }
    if (typeof this.searchResponce != 'undefined') {
      this.searchResult = "Match found!!";
      this.isFound = true;
    }
  }
  toogleDisplay() {
    this.isSearched = false;
    this.displaySurvey = true;
    this.isAdding = false;
    this.isUpdating = false;
    this.heading = "All surveys";
    this.ngOnInit();
  }
  showForm() {
    this.displaySurvey = false;
    this.isSearched = false;
    this.isUpdating = false;
    this.isAdding = true;
    this.heading = "Add survey";
  }
  showForm2(id: number) {
    this.displaySurvey = false;
    this.isSearched = false;
    this.isAdding = false;
    this.isUpdating = true;
    this.heading = "Update survey";
    this.tempsurvey.id = id;
  }
  addsurvey() {
    this.survey.addSurvey(this.tempsurvey).subscribe(
      data => {
        window.alert(`Hooray!! A new Survey added successfully.`);
        this.ngOnInit();
        this.toogleDisplay();
      },
      error => console.log()
      //window.alert("Invalid Survey ID")
    );
    this.ngOnInit();
  }
  closesurvey(id: number) {
    this.survey.closesurvey(id).subscribe();
    this.ngOnInit();
    this.toogleDisplay();
    this.ngOnInit();
  }

  updateSurvey() {
    this.survey.updateSurvey(this.tempsurvey.id, this.tempsurvey.description).subscribe(
      data => {
        window.alert(`Hooray!! A new Survey updated successfully.`);
        this.ngOnInit();
        this.toogleDisplay();
        this.ngOnInit();
      },
      error => console.log()
      //window.alert("Invalid Survey ID")
    );
    this.toogleDisplay();
    this.ngOnInit();
  }

  removesurvey(id: number) {
    if (window.confirm(`Sure you want to delete survey with id: ${id}??`)) {
      this.survey.removeSurvey(id).subscribe();
      window.alert(`survey with id: ${id} deleted successfully.`);
      this.ngOnInit();
    }
  }

  ngOnInit(): void {
    this.survey.getAllSurveys().subscribe(data => this.allsurveys = data);
    console.log(this.allsurveys);
  }
}

