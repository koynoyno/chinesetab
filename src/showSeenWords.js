// oh no, you're spoiling the fun!

export const showSeenWords = async (wordsSeen, color) => {
  // check whether tone colors are turned on
  let jiayou = color
    ? '<span class="tone1">加</span><span class="tone2">油</span>！</strong>'
    : "<span>加油</span>！</strong>";
    document.body.insertAdjacentHTML(
    "beforeend",
    '<img src="images/panda_easter.png" id="panda" draggable="false" title="酷酷酷！"/>' +
      `<p id="wordsSeen" class="invisible" align="center" title='Keep going!'>You opened <strong>${wordsSeen}</strong> Chinese Tabs<br/>` +
      `<strong>${jiayou}</p>`
  );

  // hide on click
  panda.addEventListener("click", () => {
    panda.classList.add("fade");
    // yellow-green and red-violet
    let colors = ["#cb0074", "#feb1dd", "#e9ffbf", "#9fee00", "#7f4c6a", "#35001e", "#8a9e61", "#2a4000"];
    confetti({ // left
      particleCount: 80,
      decay: 0.95,
      angle: 70,
      origin: { x: 0, y: 0.6 },
      colors: colors,
      gravity: 0.9,
      ticks: 490,
      spread: 70,
    });
    confetti({ // right
      particleCount: 70,
      decay: 0.95,
      angle: 115,
      origin: { x: 1, y: 0.55 },
      colors: colors,
      gravity: 1,
      ticks: 460,
      spread: 60,
    });
    setTimeout(function () {
      panda.remove();
      document.querySelector("#wordsSeen").classList.remove("invisible");
    }, 1200); // pause before showing wordsSeen
  });
};
