// TODO: fix flicker

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    // Code to be executed on first install
    // eg. open a tab with a url
    chrome.storage.sync.set({ level: "hsk1" });
    chrome.storage.sync.set({ char: "simplified" });
    // TODO: detect browser darkMode on install
    chrome.storage.sync.set({ darkMode: false });
    chrome.storage.sync.set({ pinyin: true });
    chrome.storage.sync.set({ translation: true });
    chrome.storage.sync.set({ color: false });
  } else if (details.reason === "update") {
    // When extension is updated
  } else if (details.reason === "chrome_update") {
    // When browser is updated
  } else if (details.reason === "shared_module_update") {
    // When a shared module is updated
  }
});
