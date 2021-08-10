export let ifFirstLaunch = (items) => {
  if (items.firstLaunch) {
    console.log(`it works`);
    document.querySelector('.container').insertAdjacentHTML('afterbegin', '<div id="welcome">Hi! 👋 Press <strong>Alt+Shift+1</strong> to open <strong>settings</strong></div>')
    // hide forever
    chrome.storage.sync.set({ firstLaunch: false });
  }
}