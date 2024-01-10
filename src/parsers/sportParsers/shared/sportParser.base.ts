import { Match } from "../../../models/match";
import { ParsedMatch } from "../../../models/parsedMatch";
import { Sport } from "./sport.enum";

export abstract class SportParser {
  supports(_sport: Sport): boolean {
    throw new Error('Method "supports" not implemented.');
  }

  validateParticipants(participant1?: any, participant2?: any): boolean {
    if (!participant1 || !participant2) {
      return false;
    }
    if (typeof participant1 !== 'string' || typeof participant2 !== 'string') {
      return false;
    }

    return true;
  }

  validateScore(score?: any): boolean {
    throw new Error('Method "validateScore" not implemented.');
  }

  parse(match: Match): ParsedMatch {
    throw new Error('Method "parse" not implemented.');
  }
}
