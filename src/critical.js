document.body.classList.add(localStorage.getItem("darkMode"));
chrome.storage.local.get(['drawObject'], (result) => {
  document.body.insertAdjacentHTML("afterbegin", `${result.drawObject}`);
});