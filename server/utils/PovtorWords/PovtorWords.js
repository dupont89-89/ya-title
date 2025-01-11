import DictionaryModule from "./DictionaryModule.js";
import wordFormsHandler from "./WordFormsModule.js";
import DuplicatesFinderModule from "./DuplicatesFinderModule.js";

const dict = DictionaryModule("ru");
const wordFormsHandlerInstance = wordFormsHandler(dict);
const wordMatrix = DuplicatesFinderModule(wordFormsHandlerInstance);

const findDuplicateWords = (text, distance) => {
  wordMatrix.build(text);
  const duplicatesChains = wordMatrix.getRepetitions(distance);
  let chainsCount = 0;
  let duplicatesCount = 0;

  duplicatesChains.forEach((chain) => {
    if (chain !== null) {
      chainsCount++;
      duplicatesCount += chain.length;
    }
  });

  return {
    chains: chainsCount,
    duplicates: duplicatesCount,
    duplicatesChains: duplicatesChains,
  };
};

export default findDuplicateWords;
