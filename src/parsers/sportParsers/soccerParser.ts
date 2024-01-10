import { Match } from '../../models/match';
import { ParsedMatch } from '../../models/parsedMatch';
import { soccerScoreRegex } from './shared/regex.const';
import { Sport } from './shared/sport.enum';
import { SportParser } from './shared/sportParser.base';

export class SoccerParser extends SportParser {
  supports(sport: string): boolean {
    return sport === Sport.Soccer;
  }

  validateScore(score: any): boolean {
    if (!score) {
      return false;
    }
    if (typeof score !== 'string') {
      return false;
    }
    if (!soccerScoreRegex.test(score)) {
      return false;
    }

    return true;
  }

  parse(match: Match): ParsedMatch {
    const name = `${match.participant1} - ${match.participant2}`;
    const score = match.score as string;
    return { name, score };
  }
}
