import { Match } from '../models/match';
import { ParsedMatch } from '../models/parsedMatch';
import { BasketballParser } from './sportParsers/basketballParser';
import { HandballParser } from './sportParsers/handballParser';
import { Sport } from './sportParsers/shared/sport.enum';
import { SportParser } from './sportParsers/shared/sportParser.base';
import { SoccerParser } from './sportParsers/soccerParser';
import { TennisParser } from './sportParsers/tennisParser';
import { VolleyballParser } from './sportParsers/volleyballParser';

export class MatchParser {
  private parsers: { [key: string]: SportParser } = {
    soccer: new SoccerParser(),
    volleyball: new VolleyballParser(),
    handball: new HandballParser(),
    basketball: new BasketballParser(),
    tennis: new TennisParser(),
  };

  parse(match: Match): ParsedMatch | null {
    try {
      const parser = this.parsers[match.sport];
      if (!parser) {
        throw new Error(`Sport "${match.sport}" not supported.`);
      }

      const nameSupported = parser.supports(match.sport as Sport);
      if (!nameSupported) {
        throw new Error(`Sport "${match.sport}" not supported.`);
      }

      const validateParticipants = parser.validateParticipants(
        match?.participant1,
        match?.participant2
      );
      if (!validateParticipants) {
        throw new Error(`Invalid participants for ${match.sport}.`);
      }

      const validateScore = parser.validateScore(match?.score);
      if (!validateScore) {
        throw new Error(`Invalid score format for ${match.sport}.`);
      }

      return parser.parse(match);
    } catch (error: any) {
      console.warn(error.message);
      return null;
    }
  }
}
