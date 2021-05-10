import { ParticipantaboutComponent } from './participantabout/participantabout.component';
import { ParticipanthomeComponent } from './participanthome/participanthome.component';
import { TakeSurveyComponent } from './take-survey/take-survey.component';
import { QuestionComponent } from './question/question.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyorComponent } from './surveyor/surveyor.component';
import { TopicComponent } from './topic/topic.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ParticipantComponent } from './participant/participant.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AboutComponent } from './about/about.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: '', component: LogInComponent},
  {path: 'home', component: HomeComponent, pathMatch:"full", canActivate:[AuthGuard]},
  {path: 'topics', component: TopicComponent, canActivate:[AuthGuard]},
  {path: 'surveyor', component: SurveyorComponent, canActivate:[AuthGuard]},
  {path: 'participants', component: ParticipantComponent, canActivate:[AuthGuard]},
  {path: 'feedbacks', component: FeedbackComponent, canActivate:[AuthGuard]},
  {path: 'about', component: AboutComponent, canActivate:[AuthGuard]},
  {path: 'surveys', component: SurveyComponent, canActivate:[AuthGuard]},
  {path: 'questions', component: QuestionComponent, canActivate:[AuthGuard]},
  {path: 'takeSurvey', component: TakeSurveyComponent, canActivate:[AuthGuard]},
  {path: 'logout', component: LogInComponent, canActivate:[AuthGuard]},
  {path: 'participanthome', component: ParticipanthomeComponent, canActivate:[AuthGuard]},
  {path: 'participantabout', component: ParticipantaboutComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
