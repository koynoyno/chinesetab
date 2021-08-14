document.body.classList.add(localStorage.getItem("darkMode"));

const luck = 88;

chrome.storage.sync.get(null, async (items) => {
  // TODO: fetch cached character (update on settings changes)
  const { default: hsk } = await import(`../${items.hsk}/${items.level}.json`, {
    assert: { type: "json" },
  });

  // if extension is updated
  // TODO: fix, rn it's being called all the time
  // const { postUpdate } = await import("./postUpdate.js")
  // postUpdate(items);

  // draw characters, pinyin, tones, translation
  const { draw } = await import("./draw.js");
  draw(items, hsk);

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
});

window.addEventListener("load", async () => {
  const { consoleGreeting } = await import("./consoleGreeting.js");
  consoleGreeting();

  // TODO: load JSON .225s after to not to interrupt animation
});
