import splitAndKeep from "./color.js";

export let draw = (data, items) => {
  let drawObject = ""; // to call insertAdjacentHTML only once

  // let data = items.cache[getRandomNumber(items.dayLimit)]

  // get word
  let char = data[items.char];
  // whether the word should be clickable or not
  let classChar = items.sentenceExamples ? "char charClickable" : "char";

  // DEV show pinyin and english on hover
  let title = ""; // hover suggestion if pinyin or translation are turned off
  if (!items.pinyin && !items.translation) {
    title = `title="${data.pinyin}\n\n${data.english}"`;
  } else if (!items.pinyin) {
    title = `title="${data.pinyin}"`;
  } else if (!items.translation) {
    title = `title="${data.english}"`;
  }

  // draw colors
  if (items.color) {
    // TODO: move to color.js, remove splitAndKeep import
    let result = data.pinyinNumbered.splitAndKeep(["1", "2", "3", "4", "5"]);
    let length = result.length / 2 - 1;
    let coloredChar = "";

    for (let i = 0; i < length; i++) {
      if (char[i] !== undefined) {
        coloredChar += `<span class="tone${result[i * 2 + 1]}">${
          char[i]
        }</span>`;
      }
    }

    // drawObject += `<p class="${classChar}" align="center">${coloredChar}</p>`;
    drawObject += `<p class="${classChar}" align="center" ${title}>${coloredChar}</p>`;
  } else {
    // just show characters
    // drawObject += `<p class="${classChar}" align="center"">${char}</p>`;
    drawObject += `<p class="${classChar}" align="center" ${title}>${char}</p>`;
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
  app.insertAdjacentHTML("beforeend", drawObject);
};
