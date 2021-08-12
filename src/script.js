document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(null, async (items) => {
    // TODO: fix flicker
    if (items.darkMode) {
      document.body.classList.add("dark-mode");
    }

    // display greeting
    const { ifFirstLaunch } = await import("./firstLaunch.js");
    ifFirstLaunch(items);

    // if extension is updated
    // TODO: fix, rn it's being called all the time
    // const { postUpdate } = await import("./postUpdate.js")
    // postUpdate(items);

    // draw characters, pinyin, tones, translation
    const { draw } = await import("./draw.js");
    // draw(hsk, items);
    draw(items);

    const { consoleGreeting } = await import("./consoleGreeting.js");
    consoleGreeting();
  });
});
