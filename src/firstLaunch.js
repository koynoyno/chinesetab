export let ifFirstLaunch = (items) => {
  if (items.firstLaunch) {
    document.querySelector('.container').insertAdjacentHTML('afterbegin', '<div id="welcome">Hi! 👋 Press <strong>Alt+Shift+C</strong> to open <strong>settings</strong></div>')
    // hide forever
    chrome.storage.sync.set({ firstLaunch: false });
  }
}