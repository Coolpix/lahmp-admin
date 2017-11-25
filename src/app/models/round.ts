import {Match} from './match';
import {Season} from './season';

export class Round {
  id: number;
  name: String;
  matches: Array<Match>;
  season: Season;
}
