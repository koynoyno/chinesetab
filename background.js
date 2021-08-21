chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    // TODO sync settings after install
    chrome.storage.local.set({
      hsk: "hsk2",
      level: "hsk1",
      char: "simplified",
      dayLimit: 0,
      date: new Date().getDate(),
      // date: new Date().getMinutes(), // DEV
      randomNumber: 0,
      sentenceExamples: false,
      color: true,
      pinyin: true,
      translation: true,
      darkMode: false, // TODO: detect darkMode on install
      firstLaunch: true,
      game: {
        wordsSeen: 0,
      },
      drawObject:
        '<p class="char" ><span class="tone3">你</span><span class="tone3">好</span></p></a><p class="pinyin">nǐhǎo</p><p class="english" align="center">Hello!</p>',
    });

    chrome.tabs.create({
      url: "chrome://newtab",
    });
  } else if (details.reason === "update") {
    chrome.storage.local.set({ updated: true });
    // TODO: messaging instead of storage?
  }
  // } else if (details.reason === "chrome_update") {
  //   // When browser is updated
  // } else if (details.reason === "shared_module_update") {
  //   // When a shared module is updated
  // }
});

chrome.action.onClicked.addListener(function (tab) {
  chrome.tabs.create({
    url: "chrome://newtab",
  });
});

// DEV logger to monitor storage changes
// chrome.storage.onChanged.addListener(function (changes, namespace) {
//   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//     console.log(
//       `Storage key "${key}" in namespace "${namespace}" changed.`,
//       `Old value was "${oldValue}", new value is "${newValue}".`
//     );
//   }
// });

// DISABLED: uninstall survey
// TODO: typeform
// chrome.runtime.setUninstallURL("https://forms.gle/A2j7TKjXwUfuALqz7");
