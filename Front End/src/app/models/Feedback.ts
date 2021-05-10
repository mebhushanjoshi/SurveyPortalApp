import { Survey } from './survey';
import { Question } from './question';
import { Participant } from './participant';
export class Feedback{
    id: number;
    chosenOption: string;
    participant: Participant;
    question: Question;
    survey: Survey;
}