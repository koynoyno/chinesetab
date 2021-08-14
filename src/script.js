const luck = 88;
let cacheUpdated = false;
let newCache;

chrome.storage.sync.get(null, async (items) => {
  const { draw } = await import("./draw.js"); // async
  const { consoleGreeting } = await import("./consoleGreeting.js"); // async
  // if (items.darkMode) {
  //   document.body.classList.add("dark-mode")
  // }

  // if extension is updated
  if (items.updated) {
    const { postUpdate } = await import("./postUpdate.js");
    postUpdate(items);
  }

  // draw characters, pinyin, tones, translation
  if (Object.keys(items.cache).length === 0) {
    const { cacheUpdate } = await import("./cacheUpdate.js");
    items = await cacheUpdate(items);
    chrome.storage.sync.set({ cache: items.cache });

    cacheUpdated = true;
  }
  draw(items);

  // display first launch greeting or seen words message
  if (items.firstLaunch) {
    const { ifFirstLaunch } = await import("./firstLaunch.js");
    ifFirstLaunch();
  } else if (Math.floor(Math.random() * luck) % luck == 0) {
    const { confetti } = await import("./npm/confetti.browser.js");
    const { showSeenWords } = await import("./showSeenWords.js");
    showSeenWords(items.game.wordsSeen, items.color);
  }

  items.game.wordsSeen++;
  chrome.storage.sync.set({ game: { wordsSeen: items.game.wordsSeen } });

  // repopulate cache
  if (!cacheUpdated) {
    const { cacheUpdate } = await import("./cacheUpdate.js");
    items = await cacheUpdate(items);
    chrome.storage.sync.set({ cache: items.cache });
  }

  consoleGreeting();
});

// window.addEventListener("load", async () => {

//   // TODO: load JSON .225s after to not to interrupt animation
// });
