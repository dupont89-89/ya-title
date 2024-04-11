// Функция для поиска дубликатов
export function DuplicatesFinderModule(wordFormsHandler) {
  const wordMatrix = {};

  // Преобразует текст в упорядоченный массив слов
  wordMatrix.parseInputText = function (text) {
    return text
      .toLowerCase()
      .replace(/ё/g, "е")
      .split(/[^а-яa-z]+/)
      .filter(String);
  };

  // Строит матрицу возможных словоформ
  wordMatrix.build = function (text) {
    const wordsArray = this.parseInputText(text);
    let word = "";
    let wordForms = [];
    this.matrix = {};

    for (let pos = 0; pos < wordsArray.length; ++pos) {
      word = wordsArray[pos];

      if (!word) {
        continue;
      }
      if (word.length < 2) {
        continue;
      }

      wordForms = wordFormsHandler(word); // Получаем возможные словоформы

      for (let f = 0; f < wordForms.length; ++f) {
        if (f > 0 && word === wordForms[f]) {
          continue;
        }

        if (!this.matrix[wordForms[f]]) {
          this.matrix[wordForms[f]] = [pos];
        } else if (!this.matrix[wordForms[f]].includes(pos)) {
          this.matrix[wordForms[f]].push(pos);
        }
      }
    }

    this.compareEach();

    return this.matrix;
  };

  // Сравнивает каждое слово с другими в матрице
  wordMatrix.compareEach = function () {
    for (let word in this.matrix) {
      if (word.length < 7 || !this.matrix.hasOwnProperty(word)) {
        continue;
      }
      for (let word2 in this.matrix) {
        if (word2.length < 7 || !this.matrix.hasOwnProperty(word2)) {
          continue;
        }
        if (this.matrix[word] === this.matrix[word2]) {
          continue;
        }

        this.compareLastLetter(word, word2);
      }
    }
  };

  // Сравнивает последнюю букву двух слов
  wordMatrix.compareLastLetter = function (word, word2) {
    if (
      word.length === word2.length &&
      word.slice(0, -1) === word2.slice(0, -1)
    ) {
      const wordsMapChunk = this.matrix[word].concat(this.matrix[word2]);
      for (let pos = 0; pos < wordsMapChunk.length; ++pos) {
        const parsedPos = parseInt(wordsMapChunk[pos]);
        if (!isNaN(parsedPos)) {
          if (!this.matrix[word].includes(parsedPos)) {
            this.matrix[word].push(parsedPos);
          }
          if (!this.matrix[word2].includes(parsedPos)) {
            this.matrix[word2].push(parsedPos);
          }
        }
      }
    }
  };

  // Получает повторы
  wordMatrix.getRepetitions = function (searchDistance) {
    if (!searchDistance) {
      searchDistance = 50;
    }
    const repetitions = [];
    let pairs = [];

    for (let word in this.matrix) {
      if (!this.matrix.hasOwnProperty(word)) {
        continue;
      }
      if (this.matrix[word].length < 2) {
        continue;
      }
      const wordPos = this.matrix[word].sort((a, b) => a - b);
      for (let i = 1; i < wordPos.length; ++i) {
        const wordsDistance = wordPos[i] - wordPos[i - 1];
        if (wordsDistance > 0 && wordsDistance < searchDistance) {
          if (!pairs.includes(wordPos[i - 1])) {
            pairs.push(wordPos[i - 1]);
          }
          pairs.push(wordPos[i]);
        } else if (pairs.length > 1) {
          repetitions.push(pairs);
          pairs = [];
        }
      }
      if (pairs.length > 1) {
        repetitions.push(pairs);
        pairs = [];
      }
    }

    return this.reduceRepetitions(repetitions, searchDistance);
  };

  // Уменьшает повторы
  wordMatrix.reduceRepetitions = function (repetitions, searchDistance) {
    let intersections = [];
    repetitions = repetitions.sort((a, b) => a[0] - b[0]);
    for (let r = 0; r < repetitions.length; ++r) {
      if (repetitions[r] === null) {
        continue;
      }
      for (let rr = r + 1; rr < repetitions.length; ++rr) {
        if (repetitions[rr] === null) {
          continue;
        }
        if (
          repetitions[rr][0] - repetitions[r][repetitions[r].length - 1] >
          searchDistance
        ) {
          break;
        }
        intersections = repetitions[r].filter((item) =>
          repetitions[rr].includes(item)
        );
        if (intersections.length > 0) {
          repetitions[r] = repetitions[r]
            .concat(
              repetitions[rr].filter((item) => !repetitions[r].includes(item))
            )
            .sort((a, b) => a - b);
          repetitions[rr] = null;
        }
      }
    }

    return repetitions.filter((rep) => rep !== null);
  };

  return wordMatrix;
}
