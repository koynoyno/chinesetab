export const postUpdate = (items) => {
  // console.log('updated LOL')
  chrome.storage.local.set({ updated: false });
}