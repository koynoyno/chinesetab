import { getRandomWord } from "./getRandomWord.js";
import { getRandomNumber } from "./getRandomNumber.js";

export let cacheUpdate = async (items) => {
  const { default: hsk } = await import(`../${items.hsk}/${items.level}.json`, {
    assert: { type: "json" },
  });

  let rand;
  let hskLength = hsk.words.length;

  // select a random word if dayLimit is set
  if (parseInt(items.dayLimit) !== 0) {
    rand = getRandomWord(hskLength, items);
  } else {
    rand = getRandomNumber(hskLength);
  }

  // update and return items
  return hsk.words[rand];
};
