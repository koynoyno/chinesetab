import { draw } from "./draw.js";
import { getRandomNumber } from "./getRandomNumber.js";

// Chrome 95
// chrome.storage.session.set({test: "test" });

chrome.storage.local.get(null, async (items) => {
  // if extension is updated
  if (items.updated) {
    const { postUpdate } = await import("./postUpdate.js");
    await postUpdate(items);
  }

  // update empty cache
  if (
    items.dayLimit == "0" ||
    Object.keys(items.cache).length === 0 ||
    items.updated
  ) {
    const { cacheUpdate } = await import("./cacheUpdate.js");
    items.cache = await cacheUpdate(items);
    chrome.storage.local.set({ cache: items.cache }); // repopulate cache on reload
  }

  // draw characters, pinyin, tones, translation
  // if dayLimit == 0, then items.cache[0] will be used
  draw(
    items.cache[items.randomNumber],
    items.char,
    items.pinyin,
    items.translation,
    items.sentenceExamples,
    items.color
  );

  // everything above is important for performance
  // =============================================
  const _ = 888;
  // display first launch greeting or seen words message
  // items.firstLaunch = true; // DEV
  if (items.firstLaunch) {
    const { ifFirstLaunch } = await import("./firstLaunch.js");
    await ifFirstLaunch();
    chrome.storage.local.set({ cache: [] }); // repopulate cache on reload
  } else if (getRandomNumber(_) % _ == 0) {
    const { confetti } = await import("./npm/confetti.browser.js");
    const { showSeenWords } = await import("./showSeenWords.js");
    await showSeenWords(items.game.wordsSeen, items.color);
  }

  // update counter
  items.game.wordsSeen++;
  chrome.storage.local.set({
    game: { wordsSeen: items.game.wordsSeen },
    randomNumber: getRandomNumber(items.dayLimit),
  });

  // DEV reload tabs with space
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      chrome.tabs.reload();
    }
  });

  // DEV link dns-prefetch optimization
  // potentially it's a DDOS
  let reverso = document.createElement("link");
  reverso.rel = "dns-prefetch";
  reverso.href = "https://context.reverso.net/";
  document.head.appendChild(reverso);
});

// apply dark mode beautiful way
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    switch (key) {
      case "darkMode":
        document.body.classList.toggle("darkMode");
      default:
        // DEV
        console.log(
          `Storage key "${key}" in namespace "${namespace}" changed.`,
          `Old value was "${oldValue}", new value is "${newValue}".`
        );
    }
  }
});
