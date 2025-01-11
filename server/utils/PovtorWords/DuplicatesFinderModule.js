const DuplicatesFinderModule = (wordFormsHandler) => {
  const wordMatrix = {};

  // Преобразует текст в упорядоченный массив слов
  wordMatrix.parseInputText = (text) => {
    return text
      .toLowerCase()
      .replace(/ё/g, "е")
      .split(/[^а-яa-z]+/)
      .filter(Boolean);
  };

  // Строит матрицу возможных словоформ
  wordMatrix.build = (text) => {
    const wordsArray = wordMatrix.parseInputText(text);
    let word = "";
    let wordForms = [];
    wordMatrix.matrix = {};

    for (let pos = 0; pos < wordsArray.length; ++pos) {
      word = wordsArray[pos];

      if (!word || word.length < 2) continue;

      wordForms = wordFormsHandler(word); // Получаем возможные словоформы

      for (let f = 0; f < wordForms.length; ++f) {
        if (f > 0 && word === wordForms[f]) continue;

        if (!wordMatrix.matrix[wordForms[f]]) {
          wordMatrix.matrix[wordForms[f]] = [pos];
        } else if (!wordMatrix.matrix[wordForms[f]].includes(pos)) {
          wordMatrix.matrix[wordForms[f]].push(pos);
        }
      }
    }

    wordMatrix.compareEach();

    return wordMatrix.matrix;
  };

  // Сравнивает каждое слово с другими в матрице
  wordMatrix.compareEach = () => {
    for (let word in wordMatrix.matrix) {
      if (word.length < 7 || !wordMatrix.matrix.hasOwnProperty(word)) continue;
      for (let word2 in wordMatrix.matrix) {
        if (word2.length < 7 || !wordMatrix.matrix.hasOwnProperty(word2))
          continue;
        if (wordMatrix.matrix[word] === wordMatrix.matrix[word2]) continue;

        wordMatrix.compareLastLetter(word, word2);
      }
    }
  };

  // Сравнивает последнюю букву двух слов
  wordMatrix.compareLastLetter = (word, word2) => {
    if (
      word.length === word2.length &&
      word.slice(0, -1) === word2.slice(0, -1)
    ) {
      const wordsMapChunk = wordMatrix.matrix[word].concat(
        wordMatrix.matrix[word2]
      );
      for (let pos = 0; pos < wordsMapChunk.length; ++pos) {
        const parsedPos = parseInt(wordsMapChunk[pos]);
        if (!isNaN(parsedPos)) {
          if (!wordMatrix.matrix[word].includes(parsedPos)) {
            wordMatrix.matrix[word].push(parsedPos);
          }
          if (!wordMatrix.matrix[word2].includes(parsedPos)) {
            wordMatrix.matrix[word2].push(parsedPos);
          }
        }
      }
    }
  };

  // Получает повторы
  wordMatrix.getRepetitions = (searchDistance = 50) => {
    const repetitions = [];
    let pairs = [];

    for (let word in wordMatrix.matrix) {
      if (!wordMatrix.matrix.hasOwnProperty(word)) continue;
      if (wordMatrix.matrix[word].length < 2) continue;
      const wordPos = wordMatrix.matrix[word].sort((a, b) => a - b);
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

    return wordMatrix.reduceRepetitions(repetitions, searchDistance);
  };

  // Уменьшает повторы
  wordMatrix.reduceRepetitions = (repetitions, searchDistance) => {
    let intersections = [];
    repetitions = repetitions.sort((a, b) => a[0] - b[0]);
    for (let r = 0; r < repetitions.length; ++r) {
      if (repetitions[r] === null) continue;
      for (let rr = r + 1; rr < repetitions.length; ++rr) {
        if (repetitions[rr] === null) continue;
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
};

export default DuplicatesFinderModule;
