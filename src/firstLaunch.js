export let ifFirstLaunch = () => {
  document
    .querySelector(".container")
    .insertAdjacentHTML(
      "afterbegin",
      '<div id="welcome">你好! Press <strong>Alt+S</strong> to open <strong>Settings</strong></div>'
    );
  // hide forever
  chrome.storage.sync.set({ firstLaunch: false });
};
