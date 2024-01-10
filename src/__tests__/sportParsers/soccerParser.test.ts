import { SoccerParser } from "../../parsers/sportParsers/soccerParser";

describe('SoccerParser', () => {
  let soccerParser: SoccerParser;

  beforeEach(() => {
    soccerParser = new SoccerParser();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(soccerParser).toBeDefined();
  });

  describe('supports', () => {
    describe('when sport is not soccer', () => {
      it('should return false', () => {
        const result = soccerParser.supports('handball');

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = soccerParser.supports('invalid_sport');

        expect(result).toBe(false);
      });
    });

    describe('when sport is soccer', () => {
      it('should return true', () => {
        const result = soccerParser.supports('soccer');

        expect(result).toBe(true);
      });
    });
  });

  describe('validateScore', () => {
    describe('when score format is invalid', () => {
      it('should return false', () => {
        const result = soccerParser.validateScore(null);

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = soccerParser.validateScore(1);

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = soccerParser.validateScore([]);

        expect(result).toBe(false);
      });
    });

    describe('when score format is valid', () => {
      it('should return true', () => {
        const result = soccerParser.validateScore('3:2');

        expect(result).toBe(true);
      });
    });
  });

  describe('parse', () => {
    describe('when score format is valid', () => {
      it('should return parsed match', () => {
        const match = {
          sport: 'soccer',
          participant1: 'Team A',
          participant2: 'Team B',
          score: '3:2',
        };

        const result = soccerParser.parse(match);

        expect(result).toEqual({ name: 'Team A - Team B', score: '3:2' });
      })
    });
  });
});
