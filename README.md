# Sports Event Parser

This project is a improved version of a sports event parser from task folder. It takes a list of matches and parses them into a standardized format.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/sports-event-parser.git`
2. Navigate to the project directory: `cd sports-event-parser`
3. Install dependencies: `npm install`

## Usage

To use the sports event parser, follow these steps:

1. Open the `src/data/matches.ts` file.
2. Modify the `matches` array to include the matches you want to parse.
3. Run the application: `npm start:dev`.
4. The parsed matches will be printed to the console.

## Folder structure

The project has the following folder structure:

- `src/data`: Contains the data file with the matches.
- `src/models`: Contains the data models used in the application.
- `src/parsers`: Contains the parsers used to parse the matches.
- `src/parsers/sportParsers`: Contains the sport-specific parsers.
- `src/main.ts`: The entry point of the application.

## Adding a new sport

To add a new sport to the parser, follow these steps:

1. Create a new file in the `src/parsers/sportParsers` directory for the new sport parser.
2. Implement the parser class with a `parse` method that takes a `Match` object and returns a `ParsedMatch` object.
3. Import the new parser in the `src/parsers/matchParser.ts` file.
4. Add an entry for the new sport parser in the `parsers` object in the `MatchParser` class.
5. Save the changes and run the application to see the parsed matches for the new sport.
