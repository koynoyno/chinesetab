import { getRandomWord } from "./getRandomWord.js";
import { getRandomNumber } from "./getRandomNumber.js";

export let cacheUpdate = async (items) => {
  const { default: hsk } = await import(`../${items.hsk}/${items.level}.json`, {
    assert: { type: "json" },
  });
  let rand;
  let hskLength = hsk.words.length;

  // select a random word if charDay is set
  if (parseInt(items.charDay) !== 0) {
    rand = getRandomWord(hskLength, items);
  } else {
    chrome.storage.sync.set({ getRandomWord: [] });
    rand = getRandomNumber(hskLength);
  }

  chrome.storage.sync.set({ cache: hsk.words[rand] });
};
