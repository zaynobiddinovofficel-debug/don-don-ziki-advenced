import {
  elHands,
  elUser,
  elRobot,
  elPlayAgainButton,
  elGameZone,
  elResultZone,
  elModeChangerButton,
  elBasic,
  elAdvanced,
  elScore,
  elResultText,
  elRulesModal,
  elRulesButton,
  elCloseRules
} from "../html-elements.js";

// GAME STATE
let activeMode = "basic";

// FUNCTIONS
function swapZone(show) {
  elGameZone.classList.toggle("hidden", show);
  elResultZone.classList.toggle("hidden", !show);
}

function robotChoose() {
  const basic = ["paper","scissors","rock"];
  const advanced = ["paper","scissors","rock","scop","lizard"];
  const hands = activeMode === "basic" ? basic : advanced;
  return hands[Math.floor(Math.random() * hands.length)];
}

function checkWinner(user, robot) {
  const rules = {
    paper: { 
      rock: "USER", 
      scissors: "ROBOT", 
      paper: "TIE", 
      scop: "USER", 
      lizard: "ROBOT" 
    },
    scissors: { 
      paper: "USER", 
      rock: "ROBOT", 
      scissors: "TIE", 
      lizard: "USER", 
      scop: "ROBOT" 
    },
    rock: { 
      scissors: "USER", 
      paper: "ROBOT", 
      rock: "TIE", 
      lizard: "USER", 
      scop: "ROBOT" 
    },
    scop: { 
      scissors: "USER", 
      rock: "USER", 
      paper: "ROBOT", 
      lizard: "ROBOT", 
      scop: "TIE" 
    },
    lizard: { 
      paper: "USER", 
      scop: "USER", 
      rock: "ROBOT", 
      scissors: "ROBOT", 
      lizard: "TIE" 
    },
  };
  return rules[user][robot];
}

// HANDS CLICK
elHands.forEach(hand => {
  hand.addEventListener("click", evt => {
    const user = evt.target.alt;
    const robot = robotChoose();

    elUser.src = evt.target.src;
    elRobot.src = "./img/handload.svg";
    swapZone(true);
    elResultText.textContent = "";

    setTimeout(() => {
      elRobot.src = `./img/${robot}.svg`;

      setTimeout(() => {
        const winner = checkWinner(user, robot);
        if(winner==="USER"){
          elScore.textContent = +elScore.textContent +1;
          elResultText.textContent = "YOU WIN";
        } else if(winner==="ROBOT"){
          elResultText.textContent = "YOU LOSE";
        } else {
          elResultText.textContent = "TIE";
        }
      },500);

    },800);
  });
});

// PLAY AGAIN
elPlayAgainButton.addEventListener("click", ()=> swapZone(false));

// MODE CHANGER
elModeChangerButton.addEventListener("click", ()=>{
  elScore.textContent="0";
  swapZone(false);
  if(activeMode==="basic"){
    activeMode="advanced";
    elBasic.classList.add("hidden");
    elAdvanced.classList.remove("hidden");
    elModeChangerButton.textContent="Basic";
  } else {
    activeMode="basic";
    elAdvanced.classList.add("hidden");
    elBasic.classList.remove("hidden");
    elModeChangerButton.textContent="Advanced";
  }
});

// RULES MODAL
elRulesButton.addEventListener("click", ()=> elRulesModal.classList.remove("hidden"));
elCloseRules.addEventListener("click", ()=> elRulesModal.classList.add("hidden"));
elRulesModal.addEventListener("click", ()=> elRulesModal.classList.add("hidden"));
// elRulesModal.querySelector(".modal-content").addEventListener("click", evt => evt.stopPropagation());