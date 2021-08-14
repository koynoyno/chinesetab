document.body.classList.add(localStorage.getItem("darkMode"));

import { getRandomFrom } from "./getRandomFrom.js";

// to repopulate cache, TODO: move to another file
import { selectFromRandomWords } from "./randomWords.js";

const luck = 88;

chrome.storage.sync.get(null, async (items) => {
  // TODO: fetch cached character (update on settings changes)
  // const { default: hsk } = await import(`../${items.hsk}/${items.level}.json`, {
  //   assert: { type: "json" },
  // });

  // if extension is updated
  if (items.updated) {
    const { postUpdate } = await import("./postUpdate.js");
    postUpdate(items);
  }

  // draw characters, pinyin, tones, translation
  const { draw } = await import("./draw.js");
  // draw(items, hsk);
  draw(items, items.cache);

  // display first launch greeting or seen words message
  if (items.firstLaunch) {
    const { ifFirstLaunch } = await import("./firstLaunch.js");
    ifFirstLaunch();
  } else if (getRandomFrom(luck) % luck == 0) {
    const { confetti } = await import("./npm/confetti.browser.js");
    const { showSeenWords } = await import("./showSeenWords.js");
    showSeenWords(items.game.wordsSeen, items.color);
  }

  items.game.wordsSeen++;
  chrome.storage.sync.set({ game: { wordsSeen: items.game.wordsSeen } });

  // repopulate cache
  const { default: hsk } = await import(`../${items.hsk}/${items.level}.json`, {
    assert: { type: "json" },
  });
  let rand;
  let hskLength = hsk.words.length;

  // select a random word if charDay is set
  if (parseInt(items.charDay) !== 0) {
    rand = selectFromRandomWords(hskLength, items);
  } else {
    chrome.storage.sync.set({ randomWords: [] });
    rand = getRandomFrom(hskLength);
  }

  chrome.storage.sync.set({ cache: hsk.words[rand] });

});

window.addEventListener("load", async () => {
  const { consoleGreeting } = await import("./consoleGreeting.js");
  consoleGreeting();

  // TODO: load JSON .225s after to not to interrupt animation
});
