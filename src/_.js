document.body.classList.add(localStorage.getItem("darkMode"));
chrome.storage.local.get(["drawObject", "settingsUpdated"], (items) => {
  document.body.insertAdjacentHTML("afterbegin", `${items.drawObject}`);
});

const { script } = await import("./script.js");
await script();

// if (settingsUpdated) {
//   chrome.storage.local.set({ settingsUpdated: false });
//   chrome.tabs.reload()
// }

// if settingsUpdated {reload page twice}