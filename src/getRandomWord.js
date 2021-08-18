import { getRandomNumber } from "./getRandomNumber.js";

export const getRandomWord = (dataLength, items) => {
  let randomWords = [];
  const newDate = new Date().getDate();
  // const newDate = new Date().getMinutes(); // DEV

  if (items.randomWords.length !== parseInt(items.dayLimit)) {
    for (let i = 0; i < parseInt(items.dayLimit); i++) {
      randomWords[i] = getRandomNumber(dataLength);
    }
    chrome.storage.local.set({ randomWords: randomWords });
  } else if (items.date !== newDate) {
    for (let i = 0; i < parseInt(items.dayLimit); i++) {
      randomWords[i] = getRandomNumber(dataLength);
    }
    chrome.storage.local.set({ randomWords: randomWords, date: newDate });
  } else {
    randomWords = items.randomWords;
  }

  return randomWords[getRandomNumber(randomWords.length)];
};

// TODO: omg please optimize this