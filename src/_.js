document.body.classList.add(localStorage.getItem("darkMode"));
chrome.storage.local.get(["drawObject"], (items) => {
  document.body.insertAdjacentHTML("afterbegin", `${items.drawObject}`);
});
const { script } = await import("./script.js");
await script();
