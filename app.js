let colors = ["red", "yellow", "green", "purple"];
let h3 = document.querySelector("h3");
let h2 = document.querySelector("h2");
let p = document.querySelector("p");

let started = false;
let level = 0;
let highScore = 0;

let gameSeq = [];
let userSeq = [];

document.addEventListener("keydown", () => {
    if (!started) {
        started = true;
        levelup();
    }
});

function levelup() {
  level++;
  h3.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4);

  let color = colors[randIdx];
  let btn = document.querySelector(`.${color}`);

  flashBtn(btn);
  gameSeq.push(btn.id);
  userSeq = [];
  console.log(gameSeq);
}

function flashBtn(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function checkAns(idx) {
  //   let idx = level - 1;
  if (gameSeq[idx] == userSeq[idx]) {
    if (gameSeq.length == userSeq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    h3.innerText = "Game Over ! Press any key to start";
    p.innerText = `Your score is ${gameSeq.length}`
    checkHighScore(gameSeq.length);
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
        document.querySelector("body").style.backgroundColor = "white";
    }, 1000);
    reset();
  }
}

let btns = document.querySelectorAll(".btn");

function btnPress() {
  let btn = this;
  flashBtn(btn);
  userSeq.push(btn.id);
  checkAns(userSeq.length - 1);
}

for (btn of btns) {
  btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}

function checkHighScore(val){
    if(val>highScore){
        h2.innerText = `New High Score : ${val}`
    }
}
