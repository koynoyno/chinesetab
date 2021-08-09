import splitAndKeep from "./color.js";

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(null, async (items) => {
    // console.log(items);

    if (items.theme == "dark") {
      document.body.classList.add("dark-mode");
    }

    const { default: hsk } = await import(`../hsk/${items.level}.json`, {
      assert: { type: "json" },
    });

    let rand = Math.floor(Math.random() * hsk.words.length);
    let data = hsk.words[rand];

    // ---
    let char = data["translation-data"][items.char];
    if (items.color) {
      let pinyinNumbered = data["translation-data"]["pinyin-numbered"];
      let result = pinyinNumbered.splitAndKeep(["1", "2", "3", "4", "5"]);
      console.log(result);
      let length = result.length / 2 - 1;
      let newChar = "";

      for (let i = 0; i < length; i++) {
        console.log(i);
        newChar += `<span class="tone${result[i * 2 + 1]}">${char[i]}</span>`;
        console.log(newChar, "\n");
      }

      document.querySelector(".char").innerHTML = newChar;
    } else {
    document.querySelector(".char").innerHTML = char;

    }
    // ---

    // let char = data["translation-data"][items.char];
    // document.querySelector(".char").innerHTML = char;

    if (items.pinyin) {
      let pinyin = data["translation-data"].pinyin;
      document.querySelector(".pinyin").innerHTML = pinyin;
    }

    if (items.translation) {
      let english = data["translation-data"].english;
      document.querySelector(".english").innerHTML = english;
    }

    // TODO: speed up opening new tab
  });
});
