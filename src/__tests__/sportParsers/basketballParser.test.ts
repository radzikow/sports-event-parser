import { BasketballParser } from '../../parsers/sportParsers/basketballParser';

describe('BasketballParser', () => {
  let basketballParser: BasketballParser;

  beforeEach(() => {
    basketballParser = new BasketballParser();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(basketballParser).toBeDefined();
  });

  describe('supports', () => {
    describe('when sport is not basketball', () => {
      it('should return false', () => {
        const result = basketballParser.supports('soccer');

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = basketballParser.supports('invalid_sport');

        expect(result).toBe(false);
      });
    });

    describe('when sport is basketball', () => {
      it('should return true', () => {
        const result = basketballParser.supports('basketball');

        expect(result).toBe(true);
      });
    });
  });

  describe('validateScore', () => {
    describe('when score format is invalid', () => {
      it('should return false', () => {
        const result = basketballParser.validateScore(null);

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = basketballParser.validateScore('3:2');

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = basketballParser.validateScore([]);

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = basketballParser.validateScore([[], []]);

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = basketballParser.validateScore([
          ['9:7', '2:1'],
          ['5:3', '9:9'],
          ['5:4', '8:9'],
        ]);

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = basketballParser.validateScore([
          ['9:7', '2:1'],
          ['5:3', '9:9', '5:4'],
        ]);

        expect(result).toBe(false);
      });

      it('should return false', () => {
        const result = basketballParser.validateScore([
          ['5:3', '9:9', '5:4'],
          ['9:7', '2:1'],
        ]);

        expect(result).toBe(false);
      });
    });

    describe('when score format is valid', () => {
      it('should return true', () => {
        const result = basketballParser.validateScore([
          ['9:7', '2:1'],
          ['5:3', '9:9'],
        ]);

        expect(result).toBe(true);
      });
    });
  });

  describe('parse', () => {
    describe('when parsed object is valid', () => {
      it('should return parsed match object', () => {
        const match = {
          sport: 'basketball',
          participant1: 'GKS Tychy',
          participant2: 'GKS Katowice',
          score: [
            ['9:7', '2:1'],
            ['5:3', '9:9'],
          ],
        } as any;

        const parsedMatch = basketballParser.parse(match);

        expect(parsedMatch).toEqual({
          name: 'GKS Tychy - GKS Katowice',
          score: '9:7,2:1,5:3,9:9',
        });
      });
    });
  });
});
