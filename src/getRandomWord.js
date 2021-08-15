import { getRandomNumber } from "./getRandomNumber.js";

export let getRandomWord = (hskLength, items) => {
  let randomWords = [];
  const newDate = new Date().getDate();
  // const newDate = new Date().getMinutes(); // debug

  if (items.randomWords.length !== parseInt(items.charDay)) {
    for (let i = 0; i < parseInt(items.charDay); i++) {
      randomWords[i] = getRandomNumber(hskLength);
    }
    chrome.storage.sync.set({ randomWords: randomWords });
  } else if (items.date !== newDate) {
    for (let i = 0; i < parseInt(items.charDay); i++) {
      randomWords[i] = getRandomNumber(hskLength);
    }
    chrome.storage.sync.set({ randomWords: randomWords, date: newDate });
  } else {
    randomWords = items.randomWords;
  }

  return randomWords[getRandomNumber(randomWords.length)];
};

// TODO: omg please optimize this