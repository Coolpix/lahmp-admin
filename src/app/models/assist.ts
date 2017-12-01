import {Player} from './player';
import {Goal} from './goal';
import {Team} from './team';
import {Match} from './match';
import {Season} from './season';

export class Assist {
  id: number;
  goal: Goal;
  team: Team;
  player: Player;
  match: Match;
  season: Season;
  data: any;
}
