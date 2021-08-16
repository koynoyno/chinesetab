import { draw } from "./draw.js";
import { cacheUpdate } from "./cacheUpdate.js";

chrome.storage.sync.get(null, async (items) => {
  const luck = 88;

  // if extension is updated
  if (items.updated) {
    const { postUpdate } = await import("./postUpdate.js");
    await postUpdate(items);
  }

  // update empty cache
  if (Object.keys(items.cache).length === 0) {
    // const { cacheUpdate } = await import("./cacheUpdate.js");
    items.cache = await cacheUpdate(items);
  }

  // draw characters, pinyin, tones, translation
  draw(items);

  // display first launch greeting or seen words message
  // items.firstLaunch = true;
  if (items.firstLaunch) {
    const { ifFirstLaunch } = await import("./firstLaunch.js");
    await ifFirstLaunch();
  } else if (Math.floor(Math.random() * luck) % luck == 0) {
    const { confetti } = await import("./npm/confetti.browser.js");
    const { showSeenWords } = await import("./showSeenWords.js");
    await showSeenWords(items.game.wordsSeen, items.color);
  }

  // counter is updated on every tab
  items.game.wordsSeen++;
  // repopulate cache and update counter
  chrome.storage.sync.set({
    cache: await cacheUpdate(items),
    game: { wordsSeen: items.game.wordsSeen },
  });

  const { consoleGreeting } = await import("./consoleGreeting.js"); // async
  await consoleGreeting();

  // DEV reload tabs with space
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      chrome.tabs.reload();
    }
  });
});

// // apply dark mode beautiful way
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    switch (key) {
      case "darkMode":
        document.body.classList.toggle("darkMode");
      default:
        console.log(
          `Storage key "${key}" in namespace "${namespace}" changed.`,
          `Old value was "${oldValue}", new value is "${newValue}".`
        );
    }
  }
});
