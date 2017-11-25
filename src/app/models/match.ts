import {Team} from './team';
import {Round} from './round';
import {Goal} from './goal';
import {Assist} from './assist';
import {Season} from './season';

export class Match {
  id: number;
  teams: Array<Team>;
  round: Round;
  goals: Array<Goal>;
  assists: Array<Assist>;
  season: Season;
}
