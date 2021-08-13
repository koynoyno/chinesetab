import { getRandomFrom } from "./getRandomFrom.js";
const luck = 888;

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(null, async (items) => {
    // TODO: fix flicker
    if (items.darkMode) {
      document.body.classList.add("dark-mode");
    }

    // if extension is updated
    // TODO: fix, rn it's being called all the time
    // const { postUpdate } = await import("./postUpdate.js")
    // postUpdate(items);

    // draw characters, pinyin, tones, translation
    const { draw } = await import("./draw.js");
    // draw(hsk, items);
    draw(items);

    // display first launch greeting or easter panda
    if (items.firstLaunch) {
      const { ifFirstLaunch } = await import("./firstLaunch.js");
      ifFirstLaunch();
    } else if (getRandomFrom(luck) % luck == 0) {
      const { confetti } = await import("./npm/confetti.min.js");
      const { easter } = await import("./easter.js");
      easter(items.game.wordsSeen);
    }

    const { consoleGreeting } = await import("./consoleGreeting.js");
    consoleGreeting();
  });
});
