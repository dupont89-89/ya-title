// Функция для обработки словоформ
export function wordFormsHandler(dict) {
  // Вспомогательная функция для получения проблемных корней
  const getUnbreakableRoots = function (word) {
    const unbreakableWordRoots = [];
    let unbreakableRootMaxLength = 0;

    for (let i = dict.unbreakableRoots.length - 1; i >= 0; --i) {
      if (word.length < dict.unbreakableRoots[i].length) {
        continue;
      }
      if (word.includes(dict.unbreakableRoots[i])) {
        if (unbreakableRootMaxLength < dict.unbreakableRoots[i].length) {
          unbreakableRootMaxLength = dict.unbreakableRoots[i].length;
        }
        unbreakableWordRoots.push(dict.unbreakableRoots[i]);
      }
    }

    for (let j = unbreakableWordRoots.length - 1; j >= 0; --j) {
      if (unbreakableWordRoots[j].length < unbreakableRootMaxLength) {
        unbreakableWordRoots.splice(j, 1);
      }
    }

    return unbreakableWordRoots;
  };

  // Вспомогательная функция для проверки наличия проблемных корней
  const hasUnbreakableRoots = function (wordChunk, unbreakableWordRoots) {
    for (let i = 0; i < unbreakableWordRoots.length; ++i) {
      if (wordChunk.includes(unbreakableWordRoots[i])) {
        return true;
      }
    }
    return false;
  };

  // Вспомогательная функция для получения альтернативного корня
  const getAlternateRoot = function (wordRoot) {
    if (wordRoot.slice(-1) === "ж") {
      return wordRoot.slice(0, -1) + "г";
    }
    return null;
  };

  // Функция обработки слова
  const handler = function (word) {
    if (dict.exceptions.includes(word)) {
      return [];
    }
    if (
      dict.immutableRoots.includes(word) ||
      dict.unbreakableRoots.includes(word)
    ) {
      return [word];
    }

    const wordForms = [word];
    let wordRoot = word; // корень без аффиксов
    let suffixedWordRoot = word; // корень с суффиксом (для расширенного сопоставления)
    const unbreakableWordRoots = getUnbreakableRoots(word); // список содержащихся проблемных корней

    // порядок отсечения аффиксов: тип + количество букв, которые должны остаться у корня
    // (отрицательное значение для приставок)
    const parseSequence = [
      [dict.endings, 2],
      [dict.suffixes, 2],
      [dict.suffixes, 3],
      [dict.prefixes, -3],
    ];

    // если слово длинное, нужно дополнительное отсечение суффиксов
    if (word.length > 12) {
      parseSequence.splice(2, 0, [dict.suffixes, 3]);
    }

    for (let p = 0; p < parseSequence.length; ++p) {
      // отсечение аффиксов от слова
      const affixes = parseSequence[p][0];
      const minRootSize = parseSequence[p][1];
      const possibleAffixLength = wordRoot.length - Math.abs(minRootSize);
      let wordChunk = "";

      for (let i = affixes.length - 1; i >= 0; --i) {
        if (affixes[i].length > possibleAffixLength) {
          continue;
        }
        if (
          minRootSize > 0 &&
          affixes[i] === wordRoot.slice(affixes[i].length * -1)
        ) {
          // отсечение суффиксов и окончаний
          wordChunk = wordRoot.slice(0, affixes[i].length * -1); // возвращает корень без аффикса

          if (
            unbreakableWordRoots.length > 0 &&
            !hasUnbreakableRoots(wordChunk, unbreakableWordRoots)
          ) {
            continue; // если часть корня пропадает при отсечении аффикса, то ищется другой
          }
          wordForms.push(wordChunk);
          wordRoot = wordChunk;
          if (p === 1) {
            suffixedWordRoot = wordRoot;
          }
          break;
        } else if (
          minRootSize < 0 &&
          affixes[i] === wordRoot.slice(0, affixes[i].length)
        ) {
          // отсечение приставок
          wordChunk = wordRoot.slice(affixes[i].length);
          if (
            unbreakableWordRoots.length > 0 &&
            !hasUnbreakableRoots(wordChunk, unbreakableWordRoots)
          ) {
            continue; // если часть корня пропадает при отсечении аффикса, то ищется другой
          }
          wordForms.push(wordChunk);
          wordRoot = wordChunk;
          suffixedWordRoot = suffixedWordRoot.slice(affixes[i].length);
          wordForms.push(suffixedWordRoot);
          break;
        }
      }

      if (dict.unbreakableRoots.includes(wordRoot)) {
        break;
      }
    }

    // для корней с чередующимися согласными
    const alternateWordRoot = getAlternateRoot(wordRoot);
    if (alternateWordRoot) {
      wordForms.push(alternateWordRoot);
    }

    return wordForms;
  };

  return handler;
}
