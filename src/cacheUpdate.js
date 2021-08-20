import { getRandomNumber } from "./getRandomNumber.js";

export const cacheUpdate = async (items) => {
  const { default: data } = await import(
    `../${items.hsk}/${items.level}.json`,
    {
      assert: { type: "json" },
    }
  );

  let dataLength = data.words.length;

  // return 1 char if no dayLimit
  if (parseInt(items.dayLimit) == 0) {
    return [data.words[getRandomNumber(dataLength)]];
  } else {
    // if dayLimit !== 0, cache [dayLimit] chars
    for (let i = 0; i < items.dayLimit; i++) {
      items.cache[i] = data.words[getRandomNumber(dataLength)];
    }
    return items.cache;
  }
};
