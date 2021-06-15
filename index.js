const ObjectsToCsv = require("objects-to-csv");

function generateBingoData(
  cards = 1,
  numbers = 90,
  limit = 90,
  games = 6,
  gameRows = 3,
  gameColumns = 9,
  filename = 'bingo'
) {
  function generateKeys(prefix, total) {
    let keys = [];

    for (i = 1; i <= total; i++) {
      keys.push(`${prefix}${i}`);
    }

    return keys;
  }

  function generateNumbers(numbers) {
    let arrNumbers = [];
    for (let index = 1; index <= numbers; index++) {
      arrNumbers.push(index);
    }
    if (limit < numbers) {
      for (var i = numbers - limit - 1; i >= 0; i--) {
        arrNumbers.splice(Math.floor(Math.random() * arrNumbers.length), 1);
      }
      return arrNumbers;
    } else {
      return arrNumbers;
    }
  }

  function game() {
    const numbersArr = generateNumbers(numbers);
    const gameKeys = generateKeys("col", gameColumns);
    let game = {};

    gameKeys.forEach((key, i) => {
      if (i === 0) {
        game[key] = numbersArr
          .splice(
            0,
            numbersArr.filter((n) => n > i && n < (i + 1) * 10).length - 1
          )
          .filter((n) => n > i && n < (i + 1) * 10)
          .concat(Array(games * gameRows).fill(""))
          .slice(0, games * gameRows);
      } else if (i === gameColumns - 1) {
        game[key] = numbersArr
          .splice(
            0,
            numbersArr.filter((n) => n > i && n < (i + 1) * 10).length + 1
          )
          .filter((n) => n > i)
          .concat(Array(games * gameRows).fill(""))
          .slice(0, games * gameRows);
      } else {
        game[key] = numbersArr
          .splice(0, numbersArr.filter((n) => n > i && n < (i + 1) * 10).length)
          .filter((n) => n > i && n < (i + 1) * 10)
          .concat(Array(games * gameRows).fill(""))
          .slice(0, games * gameRows);
      }
    });
    return game;
  }

  function generateRow() {
    let row = {};
    let newGame = game();
    let keys = generateKeys("sq", gameRows * gameColumns * games);

    keys.forEach((key, i) => {
      var column = Math.floor(i / (games * gameRows)) + 1;
      var keyStr = "col" + column;

      let selectedNumber = Math.floor(Math.random() * newGame[keyStr].length);
      row[key] = newGame[keyStr][selectedNumber];
      newGame[keyStr].splice(selectedNumber, 1);
    });
    return row;
  }

  const data = [];

  for (let i = 0; i < cards; i++) {
    data.push(generateRow());
  }

  (async () => {
    const csv = new ObjectsToCsv(data);
    await csv.toDisk(`./data/${filename}.csv`);
    console.log(await csv.toString());
  })();
}

generateBingoData();