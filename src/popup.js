// darkMode
document.body.classList.add(localStorage.getItem("darkMode"));

// ==========================================
// apply settings
let saveSettings = (id, checkbox = false) => {
  let value;
  if (checkbox) {
    value = document.querySelector(`#${id}`).checked;
  } else {
    // submit string or number to avoid parseInt in the code
    let tempValue = document.querySelector(`#${id}`).value
    value = isNaN(tempValue) ? tempValue : parseInt(tempValue);
  }

  switch (id) {
    // remove cache if level or day limit is changed
    case "dayLimit":
    case "level":
      chrome.storage.local.set({ settingsUpdated: true, [id]: value, randomNumber: 0, cache: {} });
      break;

    // remove cache and redraw #level options if HSK version is toggled
    case "hsk":
      level = document.querySelector("#level");
      levelValue = level.value;
      while (level.lastElementChild) {
        level.removeChild(level.lastElementChild);
      }
      redrawHSKLevels(value);
      // fallback to HSK6 from HSK7-9 when switching to HSK 2.0
      if (value == "hsk2" && levelValue == "hsk7-9") {
        level.value = "hsk6";
        chrome.storage.local.set({ settingsUpdated: true, [id]: value, randomNumber: 0, cache: {}, level: "hsk6" });
      } else {
        level.value = levelValue;
        chrome.storage.local.set({ settingsUpdated: true, [id]: value, randomNumber: 0, cache: {} });
      }
      break;

    // redraw popup if darkMode is toggled
    case "darkMode":
      chrome.storage.local.set({ [id]: value });
      document.body.classList.toggle("darkMode");
      if (value) {
        // document.body.classList.add("darkMode");
        localStorage.setItem("darkMode", "darkMode");
      } else {
        // document.body.classList.remove("darkMode");
        localStorage.removeItem("darkMode");
      }
      break;
    default:
      chrome.storage.local.set({ settingsUpdated: true, [id]: value });
  }
};

// =============================================
// get settings on window load
let restoreSettings = () => {
  chrome.storage.local.get(
    {
      hsk: hsk,
      level: level,
      char: char,
      dayLimit: dayLimit,
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
      dayLimit.value = items.dayLimit;
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

  dayLimit.addEventListener("change", () => {
    saveSettings("dayLimit");
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
      url: "https://ko-fi.com/tab",
    });
    window.close();
  });
});
