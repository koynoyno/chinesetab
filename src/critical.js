document.body.classList.add(localStorage.getItem("darkMode"));
chrome.storage.local.get(['drawObject'], (result) => {
  console.log(result.drawObject);
  document.body.insertAdjacentHTML("afterbegin", `${result.drawObject}`);
});

await (await import("./script.js"))
