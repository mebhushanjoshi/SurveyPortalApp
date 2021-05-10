import { Topic } from './topic';
import { Surveyor } from "./Surveyor";

export class Survey{
    id: number;
    description: string;
    isActive : Boolean ;
    endDateTime : Date;
    surveyor: Surveyor;
    topic: Topic;
}