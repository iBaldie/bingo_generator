# Bingo Card Generator
This is a script that generates Bingo Cards and exports the numbers to a csv file

## Use
To use run `npm i` the `npm start`

## Configure
```javascript
generateBingoData(
  cards = 1,        // Number of cards to generate
  numbers = 90,     // Number of Numbers i.e. 1-90
  limit = 90,       // Number limit, total numbers on card
  games = 6,        // Number of games per card
  gameRows = 3,     // Number of rows in the game
  gameColumns = 9,  // Number of columns in the game
  filename = 'bingo'// CSV filename
)
```