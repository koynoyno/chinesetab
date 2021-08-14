const luck = 1;

document.body.classList.add(localStorage.getItem('darkMode'));

chrome.storage.sync.get(null, async (items) => {
  // TODO: fetch cached character (update on settings changes)
  // then you import JSON _after_ the draw, on DOMContentLoaded
  const { default: hsk } = await import(`../${items.hsk}/${items.level}.json`, {
    assert: { type: "json" },
  });

  // if extension is updated
  // TODO: fix, rn it's being called all the time
  // const { postUpdate } = await import("./postUpdate.js")
  // postUpdate(items);

  // draw characters, pinyin, tones, translation
  const { draw } = await import("./draw.js");
  // draw(hsk, items);
  draw(items, hsk);

  // display first launch greeting or easter panda
  if (items.firstLaunch) {
    const { ifFirstLaunch } = await import("./firstLaunch.js");
    ifFirstLaunch();
  } else if (Math.floor(Math.random() * luck) % luck == 0) {
    const { confetti } = await import("./npm/confetti.browser.js");
    const { easter } = await import("./easter.js");
    easter(items.game.wordsSeen, items.color);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const { consoleGreeting } = await import("./consoleGreeting.js");
  consoleGreeting();
});
