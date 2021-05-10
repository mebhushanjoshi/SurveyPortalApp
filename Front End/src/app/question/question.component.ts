
import { QuestionDataService } from './../services/question.service';
import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  allQuestions: Question[] = [];
  tempQuestion: Question = new Question();
  searchResponce: Question = new Question();
  searchKey: number | string;
  isSearched: boolean = false;
  heading: string = "All Questions";
  searchResult: string;
  isFound: boolean;
  displayQuestion: boolean = true;
  isAdding: boolean = false;
  isUpdating: boolean = false;
  constructor(private question: QuestionDataService) { }

  searchQuestion(SearchKey: number | string): void {
    this.searchResponce = undefined;
    this.isFound = false;
    this.searchResult = "No match found!!";
    this.heading = "Search results";
    this.isSearched = true;
    this.displayQuestion = false;
    for (let question of this.allQuestions) {
      if (SearchKey == question.qId) {
        this.searchResponce = question;
      }
    }
    if (typeof this.searchResponce != 'undefined') {
      this.searchResult = "Match found!!";
      this.isFound = true;
    }
  }
  toogleDisplay() {
    this.isSearched = false;
    this.displayQuestion = true;
    this.isAdding = false;
    this.isUpdating = false;
    this.heading = "All Questions";
    this.ngOnInit();
  }
  showForm() {
    this.displayQuestion = false;
    this.isSearched = false;
    this.isAdding = true;
    this.heading = "Add question";
  }

  showForm2(id: number) {
    this.displayQuestion = false;
    this.isSearched = false;
    this.isAdding = false;
    this.isUpdating = true;
    this.tempQuestion.qId = id;
    this.heading = "Update participant";
  }

  showUpdateForm(id: number): void {
    this.displayQuestion = false;
    this.isSearched = false;
    this.isAdding = false;
    this.isUpdating = true;
    this.heading = "Update topic";
    this.tempQuestion.qId = id;
  }

  addQuestion() {
    this.question.addQuestion(this.tempQuestion.questionText, this.tempQuestion.surveyId).subscribe(
      data => {
        window.alert(`Hooray!! A new question added successfully.`);
        this.ngOnInit();
      },
      error => window.alert("Invalid Survey ID")
    );
    //window.alert(`A new question added successfully.`);
    this.toogleDisplay();
    this.ngOnInit();
  }

  removeQuestion(qId: number): void {
    if (window.confirm(`Sure you want to delete topic with id: ${qId}??`)) {
      this.question.removeById(qId).subscribe();
      window.alert(`Question with id: ${qId} deleted successfully.`);
      this.ngOnInit();
    }
  }

  updateQuestion() {
    this.question.updateQuestion(this.tempQuestion.qId, this.tempQuestion.questionText).subscribe();
    window.alert(`Question with id:${this.tempQuestion.qId} updateded successfully.`);
    this.toogleDisplay();
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.question.getQuestionDetails().subscribe(data => this.allQuestions = data);
  }
}
