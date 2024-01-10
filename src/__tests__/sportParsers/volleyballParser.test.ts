import { VolleyballParser } from '../../parsers/sportParsers/volleyballParser';

describe('VolleyballParser', () => {
  let volleyballParser: VolleyballParser;

  beforeEach(() => {
    volleyballParser = new VolleyballParser();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(volleyballParser).toBeDefined();
  });

  describe('supports', () => {
    describe('when sport is not volleyball', () => {
      it('should return false', () => {
        const result = volleyballParser.supports('soccer');

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = volleyballParser.supports('invalid_sport');

        expect(result).toBe(false);
      });
    });

    describe('when sport is volleyball', () => {
      it('should return true', () => {
        const result = volleyballParser.supports('volleyball');

        expect(result).toBe(true);
      });
    });
  });

  describe('validateScore', () => {
    describe('when score format is invalid', () => {
      it('should return false', () => {
        const result = volleyballParser.validateScore(null);

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = volleyballParser.validateScore('3:2');

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = volleyballParser.validateScore([]);

        expect(result).toBe(false);
      });
    });

    describe('when score format is valid', () => {
      it('should return true', () => {
        const result = volleyballParser.validateScore('3:0,25:23,25:19,25:21');

        expect(result).toBe(true);
      });
    });
  });

  describe('parse', () => {
    describe('when parsed object is valid', () => {
      it('should return parsed match', () => {
        const match = {
          sport: 'volleyball',
          participant1: 'Germany',
          participant2: 'France',
          score: '3:0,25:23,25:19,25:21',
        };

        const result = volleyballParser.parse(match);

        expect(result).toEqual({
          name: 'Germany - France',
          score: 'Main score: 3:0 (set1 25:23, set2 25:19, set3 25:21)',
        });
      });
    });
  });
});
