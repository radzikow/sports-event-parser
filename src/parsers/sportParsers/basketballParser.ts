import { Match } from '../../models/match';
import { ParsedMatch } from '../../models/parsedMatch';
import { basketballScoreRegex } from './shared/regex.const';
import { Sport } from './shared/sport.enum';
import { SportParser } from './shared/sportParser.base';

export class BasketballParser extends SportParser {
  supports(sport: string): boolean {
    return sport === Sport.Basketball;
  }

  validateScore(score: any): boolean {
    if (!score) {
      return false;
    }
    if (!Array.isArray(score)) {
      return false;
    }
    if (score.length !== 2) {
      return false;
    }
    if (score[0].length !== 2 || score[1].length !== 2) {
      return false;
    }
    if (!Array.isArray(score[0]) || !Array.isArray(score[1])) {
      return false;
    }
    if (!basketballScoreRegex.test(score.flat().toString())) {
      return false;
    }

    return true;
  }

  parse(match: Match): ParsedMatch {
    const name = `${match.participant1} - ${match.participant2}`;
    const score = `${match.score[0][0]},${match.score[0][1]},${match.score[1][0]},${match.score[1][1]}`;
    return { name, score };
  }
}
