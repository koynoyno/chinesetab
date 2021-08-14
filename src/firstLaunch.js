export let ifFirstLaunch = () => {
  // document
  //   .querySelector(".app")
    app.insertAdjacentHTML(
      "afterbegin",
      '<div id="welcome">Press <strong>Alt+S</strong> to open <strong>Settings</strong></div>'
    );
  // hide forever
  chrome.storage.sync.set({ firstLaunch: false });
};
