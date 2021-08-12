// darkMode
chrome.storage.sync.get(null, async (items) => {
  if (items.darkMode) {
    document.body.classList.add("dark-mode");
  }
});

// apply settings
let saveSettings = (id, checkbox = false) => {
  let value;
  if (checkbox) {
    value = document.getElementById(id).checked;
  } else {
    value = document.getElementById(id).value;
  }
  // console.log(`${checkbox}`);

  chrome.storage.sync.set({ [id]: value });

  // console.log(`Set ${id}: ${value}`);

  chrome.tabs.reload();

  if (id == "darkMode") {
    console.log(`i check that, value=${value}`)
    if (value) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }
};

// get settings on window load
let restoreSettings = () => {
  chrome.storage.sync.get(
    {
      hsk: hsk,
      level: level,
      char: char,
      charDay: charDay,
      color: color,
      pinyin: pinyin,
      translation: translation,
      darkMode: darkMode,
    },
    (items) => {
      // console.log(items);
      document.getElementById("hsk").value = items.hsk;
      document.getElementById("level").value = items.level;
      document.getElementById("char").value = items.char;
      document.getElementById("charDay").value = items.charDay;
      document.getElementById("color").checked = items.color;
      document.getElementById("pinyin").checked = items.pinyin;
      document.getElementById("translation").checked = items.translation;
      document.getElementById("darkMode").checked = items.darkMode;
    }
  );

  // console.log(`Settings restored!`);
};

// multiple size="6"

// -------------------------------------------------------------

document.addEventListener("DOMContentLoaded", restoreSettings);

// selects
document.querySelector("#hsk").addEventListener("click", () => {
  saveSettings("hsk");
});

document.querySelector("#level").addEventListener("change", () => {
  saveSettings("level");
});

document.querySelector("#char").addEventListener("change", () => {
  saveSettings("char");
});

document.querySelector("#charDay").addEventListener("change", () => {
  saveSettings("charDay");
});

// checkboxes, set "true"

document.querySelector("#color").addEventListener("click", () => {
  saveSettings("color", true);
});

document.querySelector("#pinyin").addEventListener("click", () => {
  saveSettings("pinyin", true);
});

document.querySelector("#translation").addEventListener("click", () => {
  saveSettings("translation", true);
});

document.querySelector("#darkMode").addEventListener("click", () => {
  saveSettings("darkMode", true);
});

// button event listeners
// document.querySelector("#beta").addEventListener("click", () => {
//   chrome.tabs.update({
//     url: "https://www.google.com/search?q=hsk+3.0",
//   });
//   window.close();
// });

document.querySelector("#feedback").addEventListener("click", () => {
  chrome.tabs.update({
    url: "https://forms.gle/A2j7TKjXwUfuALqz7",
  });
  window.close();
});

document.querySelector("#support").addEventListener("click", () => {
  chrome.tabs.update({
    url: "https://patreon.com/bePatron?u=13164518",
  });
  window.close();
});
