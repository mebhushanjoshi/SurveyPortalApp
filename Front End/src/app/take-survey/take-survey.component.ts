import { FeedbackDataService } from './../services/feedback.service';
import { QuestionDataService } from './../services/question.service';
import { Question } from './../models/question';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css']
})
export class TakeSurveyComponent implements OnInit {

  allQuestions: Question[];
  showSurvey: boolean = false;
  answer: string;
  participantId: number;
  tempQuestion: Question;
  constructor(private question: QuestionDataService, private feedback: FeedbackDataService, private loginService: LoginService) { }

  startSurvey(){
    this.showSurvey = true;
    if(this.participantId == 24)
      this.tempQuestion= this.allQuestions[0];
    else if(this.participantId == 25)
      this.tempQuestion= this.allQuestions[2];
    else if(this.participantId == 23)
      this.tempQuestion= this.allQuestions[1];
    else if(this.participantId == 26)
      this.tempQuestion= this.allQuestions[3];
    else{
      window.alert("Invalid Id");
      this.showHome();
    }
  }
  onSubmit(){
    let opt: string;
    if(this.answer=="vd1" || this.answer=="vd2")
      opt = "Very dissatisfied";
    else if(this.answer=="d3" || this.answer=="d4" || this.answer=="d4")
      opt = "Dissatisfied";
    else if(this.answer=="s6" || this.answer=="s7" || this.answer=="s8")
      opt = "Satisfied";
    else 
      opt = "Very satisfied";
    this.feedback.addFeedback(this.participantId, this.tempQuestion.survey.id, this.tempQuestion.qId, opt).subscribe();
    window.alert("Thnakyou for giveing us your improtent feedback");
    this.showSurvey = false;
  }

  ngOnInit(): void {
    this.question.getQuestionDetails().subscribe(data => this.allQuestions = data);
  }

  showHome(){
    this.showSurvey = false;
  }
  
  logoutUser(){
    this.loginService.logout();
    location.reload();
  }
}
