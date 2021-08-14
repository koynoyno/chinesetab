// darkMode
document.body.classList.add(localStorage.getItem("darkMode"));

// ==========================================
// apply settings
let saveSettings = (id, checkbox = false) => {
  let value;
  if (checkbox) {
    value = document.querySelector(`#${id}`).checked;
  } else {
    value = document.querySelector(`#${id}`).value;
  }

  chrome.storage.sync.set({ [id]: value });

  // remove cache if level is changed
  if (id == "level") {
    chrome.storage.sync.set({ randomWords: [], cache: {} });
  }

  // redraw index.html after storage.sync.set
  // TODO: add dynamic style changing for pinyin/translation/darkMode + animation
  // See: https://stackoverflow.com/questions/38561136/chrome-extension-to-change-dom-with-a-button-in-extension-popup

  // redraw popup if darkMode is toggled
  if (id == "darkMode") {
    if (value) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.removeItem("darkMode");
    }
  }

  // remove cache and redraw #level options if HSK version is toggled
  if (id == "hsk") {
    chrome.storage.sync.set({ randomWords: [], cache: {} }); // bug fix
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
  chrome.tabs.reload();

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
      sentenceExamples: sentenceExamples,
      color: color,
      pinyin: pinyin,
      translation: translation,
      darkMode: darkMode,
    },
    (items) => {
      redrawHSKLevels(items.hsk);
      hsk.value = items.hsk;
      level.value = items.level;
      char.value = items.char;
      charDay.value = items.charDay;
      sentenceExamples.checked = items.sentenceExamples;
      color.checked = items.color;
      pinyin.checked = items.pinyin;
      translation.checked = items.translation;
      darkMode.checked = items.darkMode;
    }
  );
};

// TODO: it takes 250ms, can I optimize it?
let redrawHSKLevels = (hsk) => {
  if (hsk == "hsk2") {
    level.insertAdjacentHTML(
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
    level.insertAdjacentHTML(
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

document.addEventListener("DOMContentLoaded", async () => {
  // document.body.classList.add(localStorage.getItem("darkMode"));
  restoreSettings();
});

window.addEventListener("load", async () => {
  // TODO: optimize with event delegation
  // https://davidwalsh.name/event-delegate

  // selects
  hsk.addEventListener("change", () => {
    saveSettings("hsk");
  });

  level.addEventListener("change", () => {
    saveSettings("level");
  });

  char.addEventListener("change", () => {
    saveSettings("char");
  });

  charDay.addEventListener("change", () => {
    saveSettings("charDay");
  });

  // checkboxes
  sentenceExamples.addEventListener("click", () => {
    saveSettings("sentenceExamples", { checkbox: true });
  });

  color.addEventListener("click", () => {
    saveSettings("color", { checkbox: true });
  });

  pinyin.addEventListener("click", () => {
    saveSettings("pinyin", { checkbox: true });
  });

  translation.addEventListener("click", () => {
    saveSettings("translation", { checkbox: true });
  });

  darkMode.addEventListener("click", () => {
    saveSettings("darkMode", { checkbox: true });
  });

  // button event listeners
  feedback.addEventListener("click", () => {
    chrome.tabs.update({
      // TODO: replace, google forms sucks with popups and stuff
      url: "https://forms.gle/A2j7TKjXwUfuALqz7",
    });
    window.close();
  });

  support.addEventListener("click", () => {
    chrome.tabs.update({
      url: "https://ko-fi.com/chinesetab",
    });
    window.close();
  });
});
