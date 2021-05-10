import { Survey } from "./survey";

export class Question {
    qId: number;
    questionText: string;
    surveyId: number;
    survey: Survey;
}