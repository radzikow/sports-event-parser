import { TennisParser } from "../../parsers/sportParsers/tennisParser";

describe('TennisParser', () => {
  let tennisParser: TennisParser;

  beforeEach(() => {
    tennisParser = new TennisParser();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(tennisParser).toBeDefined();
  });

  describe('supports', () => {
    describe('when sport is not tennis', () => {
      it('should return false', () => {
        const result = tennisParser.supports('soccer');

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = tennisParser.supports('invalid_sport');

        expect(result).toBe(false);
      });
    });

    describe('when sport is tennis', () => {
      it('should return true', () => {
        const result = tennisParser.supports('tennis');

        expect(result).toBe(true);
      });
    });
  });

  describe('validateScore', () => {
    describe('when score format is invalid', () => {
      it('should return false', () => {
        const result = tennisParser.validateScore(null);

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = tennisParser.validateScore(1);

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = tennisParser.validateScore([]);

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = tennisParser.validateScore('3:2');

        expect(result).toBe(false);
      });
    });

    describe('when score format is valid', () => {
      it('should return true', () => {
        const result = tennisParser.validateScore('2:1,7:6,6:3,6:7');

        expect(result).toBe(true);
      });
    });
  });

  describe('parse', () => {
    describe('when parsed object is valid', () => {
      it('should return parsed match', () => {
        const match = {
          sport: 'tennis',
          participant1: 'Maria Sharapova',
          participant2: 'Serena Williams',
          score: '2:1,7:6,6:3,6:7',
        };

        const result = tennisParser.parse(match);

        expect(result).toEqual({
          name: 'Maria Sharapova vs Serena Williams',
          score: 'Main score: 2:1 (set1 7:6, set2 6:3, set3 6:7)',
        });
      });
    });
  });
});
