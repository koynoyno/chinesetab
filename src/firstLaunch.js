export const ifFirstLaunch = () => {
  // document
  //   .querySelector(".app")
  app.insertAdjacentHTML(
    "afterbegin",
    '<p id="welcome" align="center">Press <strong><span style="text-decoration: underline;">Alt + S</span></strong> to open <strong><span style="text-decoration: underline;">S</span>ettings</strong>  🐼</p>'
  );
  // hide forever
  chrome.storage.local.set({ firstLaunch: false });
  // sync wordsSeen
  let wordsSeenSynced;
  chrome.storage.sync.get(
    {
      game: { wordsSeen: wordsSeen },
    },
    () => {
      console.log(item.wordsSeen);
      wordsSeenSynced = item.wordsSeen;

      chrome.storage.local.set({
        game: { wordsSeen: wordsSeenSynced },
      });
    }
  );
};
