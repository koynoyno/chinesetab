import { getRandomFrom } from "./getRandomFrom.js";

export let selectFromRandomWords = (hskLength, items) => {
  let randomWords = [];
  const newDate = new Date().getDate();
  // const newDate = new Date().getMinutes(); // debug

  if (items.randomWords.length !== parseInt(items.charDay)) {
    for (let i = 0; i < parseInt(items.charDay); i++) {
      randomWords[i] = getRandomFrom(hskLength);
    }
    chrome.storage.sync.set({ randomWords: randomWords });
  } else if (items.date !== newDate) {
    for (let i = 0; i < parseInt(items.charDay); i++) {
      randomWords[i] = getRandomFrom(hskLength);
    }
    chrome.storage.sync.set({ randomWords: randomWords });
    chrome.storage.sync.set({ date: newDate });
  } else {
    randomWords = items.randomWords; // bug here
  }

  return randomWords[getRandomFrom(randomWords.length)];
};

// TODO: omg please optimize this
// TODO: fix bug - switch from 2500 words to 300 words