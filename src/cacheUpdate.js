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
  if (items.dayLimit == 0) {
    return [data.words[getRandomNumber(dataLength)]];
  } else {
    // if dayLimit !== 0, cache [dayLimit] chars
    for (let i = 0; i < items.dayLimit; i++) {
      items.cache[i] = data.words[getRandomNumber(dataLength)];
    }
    // TODO fix non-unique numbers
    // const randomNumbers = new Set();
    // while (randomNumbers.size !== (items.dayLimit)) {
    //   randomNumbers.add(getRandomNumber(items.dayLimit));
    // }
    // for (let i = 0; i < items.dayLimit; i++) {
    //   items.cache[i] = data.words[randomNumbers[i]];
    // }
    return items.cache;
  }
};
