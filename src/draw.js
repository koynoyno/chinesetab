import splitAndKeep from "./color.js";
import { selectFromRandomWords } from "./randomWords.js";
import { getRandomFrom } from "./getRandomFrom.js";

export let draw = async (items, hsk) => {
  let drawObject = ""; // used to call insertAdjacentHTML only once
  let rand;
  let hskLength = hsk.words.length;

  // select a random word if charDay is set
  if (parseInt(items.charDay) !== 0) {
    rand = selectFromRandomWords(hskLength, items);
  } else {
    chrome.storage.sync.set({ randomWords: [] });
    rand = getRandomFrom(hskLength);
  }

  let data = hsk.words[rand];

  // get word
  let char = data[items.char];
  // whether the word should be clickable or not
  let classChar = items.sentenceExamples ? "char charClickable" : "char";

  // draw colors
  // TODO: fix for hsk 3.0
  if (items.color && items.hsk == "hsk2") {
    // TODO: move to color.js, remove splitAndKeep import
    let pinyinNumbered = data["pinyin-numbered"];
    let result = pinyinNumbered.splitAndKeep(["1", "2", "3", "4", "5"]);
    let length = result.length / 2 - 1;
    let coloredChar = "";

    for (let i = 0; i < length; i++) {
      if (char[i] !== undefined) {
        coloredChar += `<span class="tone${result[i * 2 + 1]}">${
          char[i]
        }</span>`;
      }
    }
    drawObject += `<p class="${classChar}" align="center">${coloredChar}</p>`;
  } else {
    // just show characters
    drawObject += `<p class="${classChar}" align="center">${char}</p>`;
  }

  // add sentence examples link
  if (items.sentenceExamples) {
    let url = "https://context.reverso.net/translation/chinese-english/";
    drawObject = `<a href="${url}${char}">${drawObject}</a>`;
  }

  // show pinyin
  if (items.pinyin) {
    drawObject += `<p class="pinyin" align="center">${data.pinyin}</p>`;
  }

  // show translation
  if (items.translation) {
    drawObject += `<p class="english" align="center">${data.english}</p>`;
  }

  // draw everything
  // TODO: it takes 450-500ms, can I optimize it?
  app.insertAdjacentHTML("beforeend", drawObject);
};
