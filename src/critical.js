document.body.classList.add(localStorage.getItem("darkMode"));
// draw from cache
chrome.storage.local.get(['drawObject'], (result) => {
  // console.log(result.drawObject)
  // document.body.insertAdjacentHTML("afterbegin", `<main>${drawObject}</main>`);
  document.body.insertAdjacentHTML("afterbegin", `${result.drawObject}`);
});