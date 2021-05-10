import { Component, OnInit } from '@angular/core';
import { Surveyor } from '../models/Surveyor';
import { SurveyorDataService } from '../services/surveyour.service';

@Component({
  selector: 'app-surveyor',
  templateUrl: './surveyor.component.html',
  styleUrls: ['./surveyor.component.css']
})
export class SurveyorComponent implements OnInit {

  allSurveyors: Surveyor[] = [];
  tempSurveyor: Surveyor = new Surveyor();
  searchResponce: Surveyor = new Surveyor();
  searchKey: number | string;
  isSearched: boolean = false;
  heading: string = "All Surveyors";
  searchResult: string;
  isFound: boolean;
  displayTopic: boolean = true;
  isAdding: boolean = false;
  isUpdating: boolean = false;
  surveyorId: number;
  
  constructor(private surveyor: SurveyorDataService) { }

  searchTopic(SearchKey: number | string): void {
    this.searchResponce = undefined;
    this.isFound = false;
    this.searchResult = "No match found!!";
    this.heading = "Search results";
    this.isSearched = true;
    this.displayTopic = false;
    this.isUpdating = false;
    this.isAdding = false;
    for (let surveyor of this.allSurveyors) {
      if (SearchKey == surveyor.id){ //|| SearchKey == surveyor.firstName ||SearchKey == surveyor.lastName) {
        this.searchResponce = surveyor;
      }
    }
    if (typeof this.searchResponce != 'undefined') {
      this.searchResult = "Match found!!";
      this.isFound = true;
    }
  }
 
  toogleDisplay(): void {
    this.isSearched = false;
    this.displayTopic = true;
    this.isAdding = false;
    this.isUpdating = false;
    this.heading = "All Surveyors";
    this.ngOnInit();
  }
 
  showAddForm(): void {
    this.displayTopic = false;
    this.isSearched = false;
    this.isUpdating = false;
    this.isAdding = true;
    this.heading = "Add Surveyor";
  }
 
  showUpdateForm(id: number): void {
    this.displayTopic = false;
    this.isSearched = false;
    this.isAdding = false;
    this.isUpdating = true;
    this.heading = "Update surveyor";
    this.tempSurveyor.id = id;
  }
  
  addSurveyor(): void {
    this.surveyor.addSurveyor(this.tempSurveyor).subscribe();
    window.alert(`Hooray!! A new surveyor added successfully.`);
    this.toogleDisplay();
    this.ngOnInit();
  }
 
  removeSurveyor(id: number): void {
    if (window.confirm(`Sure you want to delete surveyor with id: ${id}??`)) {
      this.surveyor.removeSurveyor(id).subscribe();
      window.alert(`Surveyor with id: ${id} deleted successfully.`);
      this.ngOnInit();
    }
  }
  
  updateSurveyor() {
    this.surveyor.updateSurveyor(this.tempSurveyor).subscribe();
    window.alert(`Yeahhhh!! Surveyor updateded successfully.`);
    this.toogleDisplay();
    this.ngOnInit();
  }
  
  ngOnInit(): void {
    this.surveyor.getAllSurveyors().subscribe(data => this.allSurveyors = data);
  }
}
