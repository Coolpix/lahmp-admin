import {Match} from './match';
import {Player} from './player';
import {Assist} from './assist';
import {Season} from './season';
import {Team} from './team';

export class Goal {
  id: number;
  match: Match;
  player: Player;
  team: Team;
  assist: Assist;
  season: Season;
  assistPlayer: string;
  team_id: number;
}
