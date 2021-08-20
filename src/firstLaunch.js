export const ifFirstLaunch = () => {
  // document
  //   .querySelector(".app")
  app.insertAdjacentHTML(
    "afterbegin",
    '<p id="welcome" align="center">Press <strong><span style="text-decoration: underline;">Alt + S</span></strong> to open <strong><span style="text-decoration: underline;">S</span>ettings</strong>  🐼</p>'
  );
  // hide forever
  chrome.storage.local.set({ firstLaunch: false });
  // TODO sync wordsSeen
};
