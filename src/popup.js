// darkMode
chrome.storage.sync.get(['darkMode'], async (items) => {
  if (items.darkMode) {
    document.body.classList.add("dark-mode");
  }
});

// ==========================================
// apply settings
let saveSettings = (id, checkbox = false) => {
  let value;
  if (checkbox) {
    value = document.querySelector(`#${id}`).checked;
  } else {
    value = document.querySelector(`#${id}`).value;
  }
  // console.log(`${checkbox}`);

  chrome.storage.sync.set({ [id]: value });

  // console.log(`Set ${id}: ${value}`);

  if (id == "level") {
    chrome.storage.sync.set({ randomWords: [] });
  }

  // redraw index.html after storage.sync.set
  // TODO: add dynamic style changing for pinyin/translation/darkMode
  // See: https://stackoverflow.com/questions/38561136/chrome-extension-to-change-dom-with-a-button-in-extension-popup
  chrome.tabs.reload();

  // redraw popup if darkMode is toggled
  if (id == "darkMode") {
    console.log(`i check that, value=${value}`);
    if (value) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }

  // redraw #level options if HSK version is toggled
  if (id == "hsk") {
    level = document.querySelector("#level");
    levelValue = level.value;
    while (level.lastElementChild) {
      level.removeChild(level.lastElementChild);
    }
    redrawHSKLevels(value);

    // fallback to HSK6 from HSK7-9 when switching to HSK 2.0
    if (value == "hsk2" && levelValue == "hsk7-9") {
      chrome.storage.sync.set({ level: "hsk6" });
      level.value = "hsk6";
    } else {
      level.value = levelValue;
    }
  }
};

// =============================================
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
      redrawHSKLevels(items.hsk);
      document.querySelector("#hsk").value = items.hsk;
      document.querySelector("#level").value = items.level;
      document.querySelector("#char").value = items.char;
      document.querySelector("#charDay").value = items.charDay;
      document.querySelector("#color").checked = items.color;
      document.querySelector("#pinyin").checked = items.pinyin;
      document.querySelector("#translation").checked = items.translation;
      document.querySelector("#darkMode").checked = items.darkMode;
    }
  );

  // console.log(`Settings restored!`);
};

let redrawHSKLevels = (hsk) => {
  if (hsk == "hsk2") {
    document
      .querySelector("#level")
      .insertAdjacentHTML(
        "afterbegin",
        '<option value="hsk1">HSK 1: 150 words</option>' +
          '<option value="hsk2">HSK 2: 150 words</option>' +
          '<option value="hsk3">HSK 3: 300 words</option>' +
          '<option value="hsk4">HSK 4: 600 words</option>' +
          '<option value="hsk5">HSK 5: 1300 words</option>' +
          '<option value="hsk6">HSK 6: 2500 words</option>'
      );
  } else {
    // if hsk3.0
    document
      .querySelector("#level")
      .insertAdjacentHTML(
        "afterbegin",
        '<option value="hsk1">HSK 1: 500 words</option>' +
          '<option value="hsk2">HSK 2: 772 words</option>' +
          '<option value="hsk3">HSK 3: 973 words</option>' +
          '<option value="hsk4">HSK 4: 1000 words</option>' +
          '<option value="hsk5">HSK 5: 1071 words</option>' +
          '<option value="hsk6">HSK 6: 1140 words</option>' +
          '<option value="hsk7-9">HSK 7-9: 5636 words</option>'
      );
  }
};

// multiple size="6"

// -------------------------------------------------------------

document.addEventListener("DOMContentLoaded", restoreSettings);

// selects
document.querySelector("#hsk").addEventListener("change", () => {
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
