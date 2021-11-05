let jet = document.getElementById("jet");
let board = document.getElementById("board");
window.addEventListener("keydown", (e) => {
  let left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  if (e.key == "ArrowLeft" && left > 0) {
    jet.style.left = left - 10 + "px";
  }
  // for right movement
  else if (e.key == "ArrowRight" && left <= 460) {
    jet.style.left = left + 10 + "px";
  }
  if (e.keyCode == 32) {
    let bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);

    let movebullet = setInterval(() => {
      let rocks = document.getElementsByClassName("rocks");
      for (let i = 0; i < rocks.length; i++) {
        let rock = rocks[i];

        let rockbound = rock.getBoundingClientRect();
        let bulletbound = bullet.getBoundingClientRect();

        //destroy
        if (
          bulletbound.left >= rockbound.left &&
          bulletbound.right <= rockbound.right &&
          bulletbound.top <= rockbound.top &&
          bulletbound.bottom <= rockbound.bottom
        ) {
          rock.parentElement.removeChild(rock); //Just removing that particular rock;
          //Scoreboard
          document.getElementById("points").innerHTML =
            parseInt(document.getElementById("points").innerHTML) + 1;
        }
      }
      let bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")
      );
      if (bulletbottom >= 500) {
        clearInterval(movebullet);
      }
      bullet.style.left = left + "px";
      bullet.style.bottom = bulletbottom + 3 + "px";
    }, 50);
  }
});

let generaterocks = setInterval(() => {
  let rock = document.createElement("div");
  rock.classList.add("rocks");
  let rockleft = parseInt(
    window.getComputedStyle(rock).getPropertyValue("left")
  );
  rock.style.left = Math.floor(Math.random() * 460) + "px";
  board.appendChild(rock);
}, 2500);

let moverocks = setInterval(() => {
  let rocks = document.getElementsByClassName("rocks");
  if (rocks != undefined) {
    for (let i = 0; i < rocks.length; i++) {
      let rock = rocks[i];
      let rocktop = parseInt(
        window.getComputedStyle(rock).getPropertyValue("top")
      );
      if (rocktop >= 475) {
        alert("Game Over");
        clearInterval(moverocks);
        window.location.reload();
      }

      rock.style.top = rocktop + 20 + "px";
    }
  }
}, 450);
