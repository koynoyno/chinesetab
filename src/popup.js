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
    let tempValue = document.querySelector(`#${id}`).value;
    value = isNaN(tempValue) ? tempValue : parseInt(tempValue);
  }

  // https://stackoverflow.com/questions/45179138/sending-message-from-popup-to-content-script-chrome-extension/45186218
  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //   chrome.tabs.sendMessage(
  //     tabs[0].id,
  //     { type: "getText" },
  //     function (response) {
  //       alert(response);
  //     }
  //   );
  // });

  switch (id) {
    // remove cache if level or day limit is changed
    case "dayLimit":
    case "level":
      chrome.storage.local.set({
        settingsUpdated: true,
        [id]: value,
        randomNumber: 0,
        cache: {},
      });
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
        chrome.storage.local.set({
          settingsUpdated: true,
          [id]: value,
          randomNumber: 0,
          cache: {},
          level: "hsk6",
        });
      } else {
        level.value = levelValue;
        chrome.storage.local.set({
          settingsUpdated: true,
          [id]: value,
          randomNumber: 0,
          cache: {},
        });
      }
      break;

    // redraw popup if darkMode is toggled
    case "darkMode":
      chrome.storage.local.set({ [id]: value });
      document.body.classList.toggle("darkMode");
      if (value) {
        localStorage.setItem("darkMode", "darkMode");
      } else {
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
      shareCache: "shareCache",
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

      twitterSave.addEventListener("click", () => {
        let twitterUrl = `https://twitter.com/intent/tweet?text=${
          items.shareCache[items.char]
        } 「 ${items.shareCache.pinyin} 」 ${
          items.shareCache.english
        } @ChineseTab`;
        chrome.tabs.update({
          url: twitterUrl,
        });
        window.close();
      });

      facebookSave.addEventListener("click", () => {
        let facebookUrl = `https://facebook.com/sharer.php?u=chinesetab.com&quote=${
          items.shareCache[items.char]
        } 「 ${items.shareCache.pinyin} 」 ${
          items.shareCache.english
        }`;
        chrome.tabs.update({
          url: facebookUrl,
        });
        window.close();
      });
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
  restoreSettings();

  /// open Chinese Tab if the active isn't one
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    let url = tabs[0].url;
    if (url !== "chrome://newtab/") {
      chrome.tabs.create({
        url: "chrome://newtab",
      });
    }
  });
});

// DEV
window.addEventListener("contextmenu", function (e) {
  e.preventDefault();
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
      url: "https://chrome.google.com/webstore/detail/kpalceplnmfdppclclfnljimdjdbhcid/",
    });
    window.close();
  });

  supportLink.addEventListener("click", () => {
    chrome.tabs.update({
      url: "https://ko-fi.com/vlad/",
    });
    window.close();
  });
});
