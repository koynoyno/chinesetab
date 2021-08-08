document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(null, async (items) => {
    console.log(items);

    if (items.theme == "dark") {
      document.body.classList.add("dark-mode");
    }

    const { default: hsk } = await import(`../hsk/${items.level}.json`, { assert: { type: "json" } })
    let rand = Math.floor(Math.random() * 150);
    let data = hsk.words[rand];


    let char = data["translation-data"][items.char];
    document.querySelector(".char").innerHTML = char;

    if (items.pinyin) {
      let pinyin = data["translation-data"].pinyin;
      document.querySelector(".pinyin").innerHTML = pinyin;
    }

    if (items.translation) {
      let english = data["translation-data"].english;
      document.querySelector(".english").innerHTML = english;
    }
  });
});
