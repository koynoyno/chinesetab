import { getRandomFrom } from "./getRandomFrom.js";

export let selectFromRandomWords = (hskLength, items) => {
  let randomWords = [];
  const newDate = new Date().getDate();
  // const newDate = new Date().getMinutes(); // debug

  console.log(`${items.randomWords.length}, ${items.charDay}`)

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
    randomWords = items.randomWords;
  }

  return randomWords[getRandomFrom(randomWords.length)];
};



// TODO: omg please optimize this