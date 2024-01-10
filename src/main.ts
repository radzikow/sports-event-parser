import { matches } from './data/matches';
import { Match } from './models/match';
import { ParsedMatch } from './models/parsedMatch';
import { EventParser } from './parsers/eventParser';
import { MatchParser } from './parsers/matchParser';

const eventParser = new EventParser(new MatchParser());

const parsedMatches = matches
  .map((match) => eventParser.parse(match as Match))
  .filter(Boolean) as ParsedMatch[];

console.log(parsedMatches);
