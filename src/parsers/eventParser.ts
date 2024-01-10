import { Match } from '../models/match';
import { ParsedMatch } from '../models/parsedMatch';
import { MatchParser } from './matchParser';

export class EventParser {
  constructor(private readonly matchParser: MatchParser) {}

  parse(match: Match): ParsedMatch | null {
    return this.matchParser.parse(match);
  }
}
