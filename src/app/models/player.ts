import {Team} from './team';
import {Assist} from './assist';
import {Goal} from './goal';

export class Player {
  id: number;
  name: string;
  photo: string;
  goals: Array<Goal>;
  assists: Array<Assist>;
  team: Team;
}
