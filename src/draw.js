import splitAndKeep from "./color.js";
import { selectFromRandomWords } from "./randomWords.js";

export let draw = async (items) => {
  const { default: hsk } = await import(`../${items.hsk}/${items.level}.json`, {
    assert: { type: "json" },
  }); // import required json vocabulary

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
    // let newChar = docum

    for (let i = 0; i < length; i++) {
      // console.log(i);
      if (char[i] !== undefined) {
        newChar += `<span class="tone${result[i * 2 + 1]}">${char[i]}</span>`;
        // console.log(newChar, "\n");
      }
    }

    document
      .querySelector(".char")
      .insertAdjacentHTML("beforeend", `${newChar}`);
  } else {
    // just show characters
    document.querySelector(".char").insertAdjacentHTML("beforeend", `${char}`);
  }

  // show pinyin
  if (items.pinyin) {
    let pinyin = data.pinyin;
    document
      .querySelector(".pinyin")
      .insertAdjacentHTML("beforeend", `${pinyin}`);
  }

  // show translation
  if (items.translation) {
    let english = data.english;
    document
      .querySelector(".english")
      .insertAdjacentHTML("beforeend", `${english}`);
  }

  // TODO: set option in popup, support traditional characters
  document.querySelector(".char").addEventListener("click", () => {
    chrome.tabs.update({
      url: `https://context.reverso.net/translation/chinese-english/${char}`,
    });
  });

  // TODO: gamification system
  items.game.wordsSeen++;
  chrome.storage.sync.set({ game: { wordsSeen: items.game.wordsSeen } });
  console.log(items.game.wordsSeen);
};
