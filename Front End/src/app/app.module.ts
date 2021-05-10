import { SurveyorDataService } from './services/surveyour.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { TopicComponent } from './topic/topic.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SurveyorComponent } from './surveyor/surveyor.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ParticipantComponent } from './participant/participant.component';
import { AboutComponent } from './about/about.component';
import { SurveyComponent } from './survey/survey.component';
import { QuestionComponent } from './question/question.component';
import { TakeSurveyComponent } from './take-survey/take-survey.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthIntercrptor } from './services/auth.interceptor';
import { ParticipanthomeComponent } from './participanthome/participanthome.component';
import { ParticipantaboutComponent } from './participantabout/participantabout.component';
import { ParticipantheaderComponent } from './participantheader/participantheader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    TopicComponent,
    SurveyorComponent,
    FeedbackComponent,
    ParticipantComponent,
    AboutComponent,
    SurveyComponent,
    QuestionComponent,
    TakeSurveyComponent,
    LogInComponent,
    ParticipanthomeComponent,
    ParticipantaboutComponent,
    ParticipantheaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [[{provide: HTTP_INTERCEPTORS, useClass:AuthIntercrptor, multi: true}]],
  bootstrap: [AppComponent]
})
export class AppModule { }
