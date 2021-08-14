import { getRandomNumber } from "./getRandomNumber.js";

export let getRandomWord = (hskLength, items) => {
  let getRandomWord = [];
  const newDate = new Date().getDate();
  // const newDate = new Date().getMinutes(); // debug

  if (items.getRandomWord.length !== parseInt(items.charDay)) {
    for (let i = 0; i < parseInt(items.charDay); i++) {
      getRandomWord[i] = getRandomNumber(hskLength);
    }
    chrome.storage.sync.set({ getRandomWord: getRandomWord });
  } else if (items.date !== newDate) {
    for (let i = 0; i < parseInt(items.charDay); i++) {
      getRandomWord[i] = getRandomNumber(hskLength);
    }
    chrome.storage.sync.set({ getRandomWord: getRandomWord });
    chrome.storage.sync.set({ date: newDate });
  } else {
    getRandomWord = items.getRandomWord;
  }

  return getRandomWord[getRandomNumber(getRandomWord.length)];
};

// TODO: omg please optimize this