import { MatchParser } from '../parsers/matchParser';

describe('MatchParser', () => {
  let matchParser: MatchParser;

  beforeEach(() => {
    matchParser = new MatchParser();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(matchParser).toBeDefined();
  });

  describe('parse', () => {
    describe('when match object is invalid', () => {
      beforeEach(() => {
        jest.spyOn(global.console, 'warn');
      });

      it('should return null if sport is not supported', () => {
        const match = {
          sport: 'unsupported',
          participant1: 'Chelsea',
          participant2: 'Arsenal',
          score: '3:2',
        } as any;

        const parsedMatch = matchParser.parse(match);

        expect(parsedMatch).toBeNull();
        expect(console.warn).toHaveBeenCalledTimes(1);
      });

      it('should return null if missing score property in match object', () => {
        const match = {
          sport: 'soccer',
          participant1: 'Chelsea',
          participant2: 'Arsenal',
        } as any;

        const parsedMatch = matchParser.parse(match);

        expect(parsedMatch).toBeNull();
        expect(console.warn).toHaveBeenCalledTimes(1);
      });

      it('should return null if missing one of the participants properties in match object', () => {
        const match = {
          sport: 'soccer',
          participant1: 'Chelsea',
          score: '3:2',
        } as any;

        const parsedMatch = matchParser.parse(match);

        expect(parsedMatch).toBeNull();
        expect(console.warn).toHaveBeenCalledTimes(1);
      });

      it('should return null if both of the participants properties are missing in match object', () => {
        const match = {
          sport: 'soccer',
          score: '3:2',
        } as any;

        const parsedMatch = matchParser.parse(match);

        expect(parsedMatch).toBeNull();
        expect(console.warn).toHaveBeenCalledTimes(1);
      });
    });

    describe('when match object is valid', () => {
      it('should return parsed match object', () => {
        const match = {
          sport: 'soccer',
          participant1: 'Chelsea',
          participant2: 'Arsenal',
          score: '3:2',
        } as any;

        const parsedMatch = matchParser.parse(match);

        expect(parsedMatch).toEqual({
          name: 'Chelsea - Arsenal',
          score: '3:2',
        });
        expect(console.warn).not.toHaveBeenCalled();
      });
    });
  });
});
