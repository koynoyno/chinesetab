// oh no, you're spoiling the fun!

export let showSeenWords = async (wordsSeen, color) => {
  // check whether tone colors are turned on
  let jiayou = color
    ? '<span class="tone1">加</span><span class="tone2">油</span>！</strong>'
    : "<span>加油</span>！</strong>";
  app.insertAdjacentHTML(
    "beforeend",
    '<img src="images/panda_easter.png" id="panda" draggable="false" title="酷酷酷！"/>' +
      `<p id="wordsSeen" class="invisible" align="center">You opened <strong>${wordsSeen}</strong> Chinese tabs<br/>` +
      `<strong>${jiayou}</p>`
  );

  // hide on click
  panda.addEventListener("click", () => {
    panda.classList.add("fade");
    // yellow-green and red-violet
    let colors = ["#cb0074", "#feb1dd", "#e9ffbf", "#9fee00", "#7f4c6a", "#35001e", "#8a9e61", "#2a4000"];
    confetti({
      // left
      angle: 60,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      // right
      angle: 120,
      origin: { x: 1 },
      colors: colors,
    });
    setTimeout(function () {
      panda.remove();
      document.querySelector("#wordsSeen").classList.remove("invisible");
    }, 195); // hide panda after 195ms (see css/style.css:#panda)
  });
};
