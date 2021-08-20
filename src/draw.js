import splitAndKeep from "./color.js";

export const draw = (data, word, pinyin, translation, sentenceExamples, color) => {
  let drawObject = ""; // to call insertAdjacentHTML only once

  // drawBottom option?
  // // show pinyin
  // if (pinyin) {
  //   drawObject += `<p class="pinyin" align="center">${data.pinyin}</p>`;
  // }

  // // show translation
  // if (translation) {
  //   drawObject += `<p class="english" align="center">${data.english}</p>`;
  // }

  // get word
  let char = data[word];
  // whether the word should be clickable or not
  let classChar = sentenceExamples ? "char charClickable" : "char";

  // DEV show pinyin and english on hover
  let title = ""; // hover suggestion if pinyin or translation are turned off
  if (!pinyin && !translation) {
    title = `title="${data.pinyin}\n\n${data.english}"`;
  } else if (!pinyin) {
    title = `title="${data.pinyin}"`;
  } else if (!translation) {
    title = `title="${data.english}"`;
  }

  // draw colors
  if (color) {
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
    drawObject += `<p class="${classChar}" ${title}>${coloredChar}</p>`;
  } else {
    // just show characters
    // drawObject += `<p class="${classChar}" align="center"">${char}</p>`;
    drawObject += `<p class="${classChar}" ${title}>${char}</p>`;
  }

  // add sentence examples link
  if (sentenceExamples) {
    let url = "https://context.reverso.net/translation/chinese-english/";
    drawObject = `<a href="${url}${char}">${drawObject}</a>`;
  }

  // show pinyin
  if (pinyin) {
    drawObject += `<p class="pinyin">${data.pinyin}</p>`;
  }

  // show translation
  if (translation) {
    drawObject += `<p class="english" align="center">${data.english}</p>`;
  }

  // draw everything. afterbegin or beforeend?
  // document.body.insertAdjacentHTML("afterbegin", `<main>${drawObject}</main>`);
  // return drawObject;
  chrome.storage.local.set({drawObject: drawObject}, () => {
    // console.log('Value is set to ' + value);
  });
  // return drawObject;
};
