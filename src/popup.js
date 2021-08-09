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
    },
    (items) => {
      console.log(items);
      document.getElementById("level").value = items.level;
      document.getElementById("char").value = items.char;
      document.getElementById("theme").value = items.theme;
      document.getElementById("pinyin").checked = items.pinyin;
      document.getElementById("translation").checked = items.translation;
    }
  );

  // console.log(`Settings restored!`);
};

// multiple size="6"

// -------------------------------------------------------------

document.addEventListener("DOMContentLoaded", restoreSettings);

document.getElementById("level").addEventListener("click", () => {
  saveSettings("level");
});

document.getElementById("char").addEventListener("click", () => {
  saveSettings("char");
});

document.getElementById("theme").addEventListener("click", () => {
  saveSettings("theme");
});

document.getElementById("pinyin").addEventListener("click", () => {
  saveSettings("pinyin", true);
});

document.getElementById("translation").addEventListener("click", () => {
  saveSettings("translation", true);
});

// button event listeners here
document.getElementById("feedback").addEventListener("click", () => {
  chrome.tabs.update({
    url: 'https://forms.gle/cq75MmHtBFtGGauU9'
  });
  window.close();
});

document.getElementById("patreon").addEventListener("click", () => {
  chrome.tabs.update({
    url: 'https://www.patreon.com/koyno'
  });
  window.close();
});