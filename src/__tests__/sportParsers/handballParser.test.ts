import { HandballParser } from '../../parsers/sportParsers/handballParser';

describe('HandballParser', () => {
  let handballParser: HandballParser;

  beforeEach(() => {
    handballParser = new HandballParser();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(handballParser).toBeDefined();
  });

  describe('supports', () => {
    describe('when sport is not handball', () => {
      it('should return false', () => {
        const result = handballParser.supports('soccer');

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = handballParser.supports('invalid_sport');

        expect(result).toBe(false);
      });
    });

    describe('when sport is handball', () => {
      it('should return true', () => {
        const result = handballParser.supports('handball');

        expect(result).toBe(true);
      });
    });
  });

  describe('validateScore', () => {
    describe('when score format is invalid', () => {
      it('should return false', () => {
        const result = handballParser.validateScore(null);

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = handballParser.validateScore(1);

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = handballParser.validateScore([]);

        expect(result).toBe(false);
      });
    });

    describe('when score format is valid', () => {
      it('should return true', () => {
        const result = handballParser.validateScore('3:2');

        expect(result).toBe(true);
      });
    });
  });

  describe('parse', () => {
    describe('when parsed object is valid', () => {
      it('should return parsed object', () => {
        const match = {
          sport: 'handball',
          participant1: 'Pogoń Szczeciń',
          participant2: 'Azoty Puławy',
          score: '34:26',
        };

        const result = handballParser.parse(match);

        expect(result).toEqual({
          name: 'Pogoń Szczeciń vs Azoty Puławy',
          score: '34:26',
        });
      });
    });
  });
});
