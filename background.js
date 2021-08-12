// TODO: fix flicker

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    chrome.storage.sync.set({ level: "hsk1" });
    chrome.storage.sync.set({ char: "simplified" });

    // characters per day
    chrome.storage.sync.set({ charDay: "5" });
    chrome.storage.sync.set({ date: new Date().getDate() });
    // chrome.storage.sync.set({ date: new Date().getMinutes() }); // debug
    chrome.storage.sync.set({ randomWords: [] });

    // TODO: detect browser darkMode on install
    chrome.storage.sync.set({ color: true });
    chrome.storage.sync.set({ pinyin: true });
    chrome.storage.sync.set({ translation: true });
    chrome.storage.sync.set({ darkMode: false });

    // show new tab and greeting
    chrome.storage.sync.set({ firstLaunch: true });
    chrome.tabs.create({
      url: "chrome://newtab",
    });
  } else if (details.reason === "update") {
    chrome.storage.sync.set({ updated: true });
  } else if (details.reason === "chrome_update") {
    // When browser is updated
  } else if (details.reason === "shared_module_update") {
    // When a shared module is updated
  }
});

chrome.runtime.setUninstallURL('https://forms.gle/A2j7TKjXwUfuALqz7')