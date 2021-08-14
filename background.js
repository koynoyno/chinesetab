chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    chrome.storage.sync.set({
      hsk: "hsk2",
      level: "hsk1",
      char: "simplified",
      charDay: "5",
      date: new Date().getDate(),
      // date: new Date().getMinutes() }); // debug
      randomWords: [],
      color: true,
      pinyin: true,
      translation: true,
      darkMode: false, // TODO: detect darkMode on install
      firstLaunch: true,
      game: {
        wordsSeen: 0,
      },
    });
    chrome.tabs.create({
      url: "chrome://newtab",
    });
  }
  // } else if (details.reason === "update") {
  //   chrome.storage.sync.set({ updated: true });
  // } else if (details.reason === "chrome_update") {
  //   // When browser is updated
  // } else if (details.reason === "shared_module_update") {
  //   // When a shared module is updated
  // }

  // localStorage is the synchronous, this way white flash can be avoided
  // TODO: implement messaging to localStorage approach
});

// DISABLED: uninstall survey
// TODO: typeform
// chrome.runtime.setUninstallURL("https://forms.gle/A2j7TKjXwUfuALqz7");
