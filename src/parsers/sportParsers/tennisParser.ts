import { Match } from '../../models/match';
import { ParsedMatch } from '../../models/parsedMatch';
import { tennisScoreRegex } from './shared/regex.const';
import { Sport } from './shared/sport.enum';
import { SportParser } from './shared/sportParser.base';

export class TennisParser extends SportParser {
  supports(sport: string): boolean {
    return sport === Sport.Tennis;
  }

  validateScore(score: any): boolean {
    if (!score) {
      return false;
    }
    if (typeof score !== 'string') {
      return false;
    }
    if (!tennisScoreRegex.test(score)) {
      return false;
    }

    return true;
  }

  parse(match: Match): ParsedMatch {
    const name = `${match.participant1} vs ${match.participant2}`;
    const scores = (match.score as string).split(',');
    const score = `Main score: ${scores[0]} (set1 ${scores[1]}, set2 ${scores[2]}, set3 ${scores[3]})`;
    return { name, score };
  }
}
