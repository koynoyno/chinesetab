import { draw } from "./draw.js";
import { getRandomNumber } from "./getRandomNumber.js";
const _ = 1;
let hackFlag;

// Chrome 95
// chrome.storage.session.set({test: "test" });

export async function script() {
  chrome.storage.local.get(null, async (items) => {
    // if extension is updated, wipe cache, just in case
    // if (items.updated) {
    //   const { postUpdate } = await import("./postUpdate.js");
    //   await postUpdate(items);
    //   items.cache = {};
    // }

    // new day, new cache
    // let currentDate = new Date().getMinutes(); // DEV
    let currentDate = new Date().getDate();
    if (items.date !== currentDate) {
      items.cache = {};
      chrome.storage.local.set({ date: currentDate });
    }

    // update empty cache
    if (items.dayLimit == "0" || Object.keys(items.cache).length === 0) {
      const { cacheUpdate } = await import("./cacheUpdate.js");
      items.cache = await cacheUpdate(items);
      chrome.storage.local.set({ cache: items.cache }); // repopulate cache on reload
    }

    // compose drawObject: characters, pinyin, tones, translation
    // TODO rename draw to makeDrawObject or smth
    draw(
      items.cache[items.randomNumber], // if dayLimit == 0, then items.cache[0] is used
      items.char,
      items.pinyin,
      items.translation,
      items.sentenceExamples,
      items.color
    );

    if (items.settingsUpdated) {
      // skip everything if settings were changed
      chrome.storage.local.set({ settingsUpdated: false });
    } else if (hackFlag) {
      // hackFlag doesn't trigger listener and skips the 2nd iteration
      hackFlag = false;
    } else {

      // update counter
      items.game.wordsSeen++;
      console.log(items.game.wordsSeen + '\n');
      chrome.storage.local.set({
        game: { wordsSeen: items.game.wordsSeen },
        randomNumber: getRandomNumber(items.dayLimit),
      });
      chrome.storage.sync.set({
        game: { wordsSeen: items.game.wordsSeen },
      });

      // display first launch greeting or seen words message
      // items.firstLaunch = true; // DEV
      if (items.firstLaunch) {
        const { ifFirstLaunch } = await import("./firstLaunch.js");
        await ifFirstLaunch();
      } else if (getRandomNumber(_) % _ == 0) {
        const { confetti } = await import("./npm/confetti.browser.js");
        const { showSeenWords } = await import("./showSeenWords.js");
        await showSeenWords(items.game.wordsSeen, items.color);
      }

      // DEV reload tabs with space
      window.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
          chrome.tabs.reload();
        }
      });

      // DEV link dns-prefetch optimization
      // potentially it's a DDOS
      if (items.sentenceExamples) {
        let reverso = document.createElement("link");
        reverso.rel = "dns-prefetch";
        reverso.href = "https://context.reverso.net/";
        document.head.appendChild(reverso);
      }
    }
  });
}

// apply dark mode beautiful way
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    switch (key) {
      case "darkMode":
        document.body.classList.toggle("darkMode");
        break;
      case "settingsUpdated": // really
        hackFlag = true; // dirty
        script(); // hack
        break; // to updateCache without reloading the page
      case "hsk":
      case "level":
      case "char":
      case "dayLimit":
      case "sentenceExamples":
      case "color":
      case "pinyin":
      case "translation":
        chrome.tabs.reload();
      default:
      // DEV
      // console.log(
      //   `Storage key "${key}" in namespace "${namespace}" changed.`,
      //   `Old value was "${oldValue}", new value is "${newValue}".`
      // );
    }
  }
});
