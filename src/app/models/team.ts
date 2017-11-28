import {Player} from './player';
import {Match} from './match';
import {Assist} from './assist';
import {Goal} from './goal';

export class Team {
  id: number;
  name: string;
  photo: string;
  logo: string;
  points: number;
  players: Array<Player>;
  matches: Array<Match>;
  goals: Array<Goal>;
  assits: Array<Assist>;
}
