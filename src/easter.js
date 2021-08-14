// Oh no, you're spoiling all the fun!

export let easter = async (wordsSeen, color) => {
  // check whether tone colors are turned on
  let jiayou = color ? '<span class="tone1">加</span><span class="tone2">油</span>！</strong>' : '<span>加油</span>！</strong>'
  document
    .querySelector(".app")
    .insertAdjacentHTML(
      "beforeend",
      '<img src="images/panda_easter.png" id="panda" draggable="false" />' +
        `<p id="wordsSeen" class="invisible" align="center">You opened <strong>${wordsSeen}</strong> Chinese tabs<br/>` +
        `<strong>${jiayou}</p>`
    );

  // hide on click
  panda.addEventListener("click", () => {
    panda.classList.add("fade");
    // TODO: add random colors from tones
    confetti({ // confetti, duh
      angle: 60,
      origin: { x: 0 },
    });
    confetti({
      angle: 120,
      origin: { x: 1 },
    });
    confetti({
      origin: { x: 0.5, y: 1 },
    });
    setTimeout(function () {
      panda.remove();
      document.querySelector("#wordsSeen").classList.remove("invisible");
    }, 195); // hide panda after 195ms (see css/style.css:#panda)
  });
};
