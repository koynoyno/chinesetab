document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(null, async (items) => {
    // TODO: fix flicker
    if (items.darkMode) {
      document.body.classList.add("dark-mode");
    }

    // import vocabulary
    const { default: hsk } = await import(`../hsk/${items.level}.json`, {
      assert: { type: "json" },
    });

    // draw characters, pinyin, tones, translation
    const { draw } = await import("./draw.js");
    draw(hsk, items);
  });
});
