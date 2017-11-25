import {Match} from './match';
import {Player} from './player';
import {Assist} from './assist';
import {Season} from './season';

export class Goal {
  id: number;
  matchId: Match;
  playerId: Player;
  assist: Assist;
  season: Season;
}
