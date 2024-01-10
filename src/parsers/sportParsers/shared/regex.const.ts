// Regex for different sport score formats. May require further improvements...

// Soccer example score: 2:1
export const soccerScoreRegex = /^\d+:\d+$/;

// Volleyball example score: 3:0,25:23,25:19,25:21
export const volleyballScoreRegex = /^(\d+:\d+,){3}\d+:\d+$/;

// Handball example score: 34:26
export const handballScoreRegex = /^\d+:\d+$/;

// Basketball example score: 9:7,2:1,5:3,9:9
export const basketballScoreRegex = /^(\d+:\d+,){3}\d+:\d+$/;

// Tennis example score: 2:1,6:7,7:6,6:4
export const tennisScoreRegex = /^(\d+:\d+,){3}\d+:\d+$/;
