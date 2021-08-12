import splitAndKeep from "./color.js";
import { selectFromRandomWords } from "./randomWords.js";
import { getRandomFrom } from "./getRandomFrom.js";

export let draw = (hsk, items) => {
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

  // get characters
  let char = data[items.char];

  // black color magic
  // TODO: fix for hsk 3.0
  if (items.color && items.hsk == "hsk2") {
    // TODO: move to color.js, remove splitAndKeep import
    let pinyinNumbered = data["pinyin-numbered"];
    let result = pinyinNumbered.splitAndKeep(["1", "2", "3", "4", "5"]);
    // console.log(result);
    let length = result.length / 2 - 1;
    let newChar = "";

    for (let i = 0; i < length; i++) {
      // console.log(i);
      if (char[i] !== undefined) {
        newChar += `<span class="tone${result[i * 2 + 1]}">${char[i]}</span>`;
        // console.log(newChar, "\n");
      }
    }

    document.querySelector(".char").innerHTML = newChar;
  } else {
    // just show characters
    document.querySelector(".char").innerHTML = char;
  }

  // show pinyin
  if (items.pinyin) {
    let pinyin = data.pinyin;
    document.querySelector(".pinyin").innerHTML = pinyin;
  }

  // show translation
  if (items.translation) {
    let english = data.english;
    document.querySelector(".english").innerHTML = english;
  }

  if (getRandomFrom(88) % 88 == 0) {
    document
      .querySelector(".container")
      .insertAdjacentHTML(
        "beforeend",
        '<img src="images/panda_easter.png" id="panda" />'
      );
    // hide on click
    panda.addEventListener("click", () => {
      panda.classList.add("fade");
      // document.querySelector("#panda").remove();
    });
  }

  // open ArchChinese on click
  document.querySelector(".char").addEventListener("click", () => {
    chrome.tabs.update({
      url: `https://www.archchinese.com/chinese_english_dictionary.html?find=${char}`,
    });
  });
};
