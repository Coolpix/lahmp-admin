import {Team} from './team';
import {Round} from './round';
import {Player} from './player';
import {Match} from './match';

export class Season {
  id: number;
  year: number;
  teams: Array<Team>;
  rounds: Array<Round>;
  players: Array<Player>;
  matches: Array<Match>;
}
