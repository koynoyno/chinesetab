import { getRandomWord } from "./getRandomWord.js";
import { getRandomNumber } from "./getRandomNumber.js";

export let cacheUpdate = async (items) => {
  const { default: data } = await import(
    `../${items.hsk}/${items.level}.json`,
    {
      assert: { type: "json" },
    }
  );

  let rand;
  let dataLength = data.words.length;

  // select a random word if dayLimit is set
  if (parseInt(items.dayLimit) !== 0) {
    for (let i = 0; i < items.dayLimit; i++) {
      rand = getRandomWord(dataLength, items);
      items.cache[i] = data.words[rand];
    }
    return items.cache;
  } else {
    rand = getRandomNumber(dataLength);
    return [data.words[rand]]; // [0]
  }
};
