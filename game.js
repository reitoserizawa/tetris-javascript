let btns = document.querySelectorAll('[id*="btn-"]');

btns.forEach((ele) => {
  let btn_id = ele.getAttribute("id");
  let body = document.querySelector("body");
  ele.addEventListener("click", () => {
    switch (btn_id) {
      case "btn-play":
        body.classList.add("play");
        if (body.classList.contain("pause")) {
          body.classList.remove("pause");
        }
        break;
      case "btn-theme":
        body.classList.toggle("dark");
        break;
      case "btn-pause":
        let btn_play = document.querySelector("#btn-play");
        btn_play.innerHTML = "resume";
        body.classList.remove("play");
        body.classList.add("pause");
        break;
      case "btn-new-game":
        body.classList.add("play");
        body.classList.remove("pause");
        break;
      case "btn-help":
        let how_to = document.querySelector(".how-to");
        how_to.classList.toggle("active");
        break;
    }
  });
});
