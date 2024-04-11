import { DictionaryModule } from "./DictionaryModule";
import { wordFormsHandler } from "./WordFormsModule";
import { DuplicatesFinderModule } from "./DuplicatesFinderModule";

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

// // App.js

// import React, { useState } from "react";
// import { DictionaryModule } from "./DictionaryModule";
// import { wordFormsHandler } from "./WordFormsModule";
// import { DuplicatesFinderModule } from "./DuplicatesFinderModule";

// function PovtorWords() {
//   const [text, setText] = useState("");
//   const [distance, setDistance] = useState(70);
//   const [isLoading, setIsLoading] = useState(false);
//   const [chains, setChains] = useState(0);
//   const [duplicates, setDuplicates] = useState(0);
//   const [processingTime, setProcessingTime] = useState(0);

//   const dict = DictionaryModule("ru");
//   const wordFormsHandlerInstance = wordFormsHandler(dict);
//   const wordMatrix = DuplicatesFinderModule(wordFormsHandlerInstance);

//   const handleChange = (event) => {
//     setText(event.target.value);
//   };

//   const handleDistanceChange = (event) => {
//     setDistance(parseInt(event.target.value));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setIsLoading(true);
//     setTimeout(() => {
//       const startTime = Date.now();
//       wordMatrix.build(text);
//       const duplicatesChains = wordMatrix.getRepetitions(distance);
//       debugger;
//       let chainsCount = 0;
//       let duplicatesCount = 0;
//       duplicatesChains.forEach((chain) => {
//         if (chain !== null) {
//           chainsCount++;
//           duplicatesCount += chain.length;
//         }
//       });
//       setChains(chainsCount);
//       setDuplicates(duplicatesCount);
//       setProcessingTime(Date.now() - startTime);
//       setIsLoading(false);
//     }, 1);
//   };

//   return (
//     <div className="App">
//       <form onSubmit={handleSubmit}>
//         <textarea value={text} onChange={handleChange} />
//         <input type="number" value={distance} onChange={handleDistanceChange} />
//         <button type="submit" disabled={isLoading}>
//           Submit
//         </button>
//       </form>
//       <div>
//         <p>Chains: {chains}</p>
//         <p>Duplicates: {duplicates}</p>
//         <p>Processing Time: {processingTime}ms</p>
//       </div>
//     </div>
//   );
// }

// export default PovtorWords;
