let saveSettings = (id, checkbox = false) => {
  let value
  if (checkbox) {
    value = document.getElementById(id).checked;
  } else {
    value = document.getElementById(id).value;
  }
  console.log(`${checkbox}`)

  chrome.storage.sync.set({ [id]: value });

  // console.log(`Set ${id}: ${value}`);
  
  chrome.tabs.reload();
};

let restoreSettings = () => {
  chrome.storage.sync.get(
    {
      level: level,
      char: char,
      theme: theme,
      pinyin: pinyin,
      translation: translation,
      color: color,
    },
    (items) => {
      // console.log(items);
      document.getElementById("level").value = items.level;
      document.getElementById("char").value = items.char;
      document.getElementById("theme").value = items.theme;
      document.getElementById("pinyin").checked = items.pinyin;
      document.getElementById("translation").checked = items.translation;
      document.getElementById("color").checked = items.color;
    }
  );

  // console.log(`Settings restored!`);
};

// multiple size="6"

// -------------------------------------------------------------

document.addEventListener("DOMContentLoaded", restoreSettings);

document.getElementById("level").addEventListener("change", () => {
  saveSettings("level");
});

document.getElementById("char").addEventListener("change", () => {
  saveSettings("char");
});

document.getElementById("theme").addEventListener("change", () => {
  saveSettings("theme");
});

document.getElementById("pinyin").addEventListener("click", () => {
  saveSettings("pinyin", true);
});

document.getElementById("translation").addEventListener("click", () => {
  saveSettings("translation", true);
});

document.getElementById("color").addEventListener("click", () => {
  saveSettings("color", true);
});

// button event listeners
document.getElementById("feedback").addEventListener("click", () => {
  chrome.tabs.update({
    url: 'https://forms.gle/cq75MmHtBFtGGauU9'
  });
  window.close();
});

document.getElementById("patreon").addEventListener("click", () => {
  chrome.tabs.update({
    url: 'https://patreon.com/bePatron?u=13164518'
  });
  window.close();
});

document.getElementById("love").addEventListener("click", () => {
  chrome.tabs.update({
    url: 'https://github.com/koynoyno/chinese-tab'
  });
  window.close();
});