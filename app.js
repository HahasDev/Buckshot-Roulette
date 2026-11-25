//Cached

const openInstructionsButtonEl = document.querySelector('#open-instructions')
const instructionsModalEl = document.querySelector('#instructions')
const closeInstructionsButtonEl = document.querySelector('#close-instructions')

const startButtonEl = document.querySelector('#start')
const panelEl = document.querySelector('.game-panel')
const gameStartedEl = document.querySelector('#game-started')

const shootPlayer = document.getElementById('shootPlayer')
const shootDealer = document.getElementById('shootDealer')

const takePillBtn = document.getElementById('takePill')
const useMagnifierBtn = document.getElementById('magnifier')
const useHandSawBtn = document.getElementById('handSaw')
const useHandcuffBtn = document.getElementById('handcuff')

const playerHeartsEl = document.querySelectorAll(".player-hearts .heart");
const dealerHeartsEl = document.querySelectorAll('.dealer-hearts .heart');

const shellsEls = document.querySelector('.shells');

let dealerEls = document.querySelectorAll('.dealer img');
const magnifierResultEl = document.getElementById('magnifier-result');

const liveShellEl = document.getElementById('liveShell');
const emptyShellEl = document.getElementById('emptyShell');

const playerButtons = [
  shootPlayer,
  shootDealer,
  takePillBtn,
  useMagnifierBtn,
  useHandSawBtn,
  useHandcuffBtn
];


console.log(openInstructionsButtonEl, instructionsModalEl)
console.dir(startButtonEl);
console.log(shootDealer);



//Variables

const chamber = []

let playerHealth = 4
let dealerHealth = 4

let playerTurn = true
let dealerDecision

const items = [
  // left determines if it will be player(0) or Dealer(1)
  // Right determines the number of the items the player will have
  [0, 0],// Player's pill
  [0, 0],// Player's magnifier
  [0, 0],// Player's handsaw
  [0, 0],// Player's handcuff
  //Dealer's items
  [1, 0],//Dealer's pill
  [1, 0],//Dealer's magnifier
  [1, 0],//Dealer's handsaw
  [1, 0],//Dealer's handcuff
]


let shotPlayer = false
let shotDealer = false
let gameEnd = false
let playerWon = false

let isSawUsed = false
let isCuffUsed = false
let isMagnifierUsed = false
let isPillUsed = false

let numberOfBullets = getRandomMinToMax(3, 8)

let liveShell = 0
let emptyShell = 0

let timeLeft = 2;
let timerId = null;


const SPEED = 1;

//functions

function toggleButtons() {
  if (playerTurn === false || gameEnd === true) {
    playerButtons.forEach((btn) => {
      btn.disabled = true;
    });
  } else {
    playerButtons.forEach((btn) => {
      btn.disabled = false;
    });
  }
}

//check who won
function checkWinner() {

  //after dealing some damage this functions will update the number of hearts the (player/dealer) have
  //I put it here so it makes sure to update the hearts so it clear the (player/dealer) lost
  updateHearts(playerHealth, dealerHealth);

  if (playerHealth <= 0) {
    playerWon = false
    gameEnd = true
  }
  else if (dealerHealth <= 0) {
    gameEnd = true
    playerWon = true
  }

  if (gameEnd === true && playerWon === true) {
    console.log(`Player Won $70,000`);
    return;
  } else if (gameEnd === true && playerWon === false) {
    console.log(`Dealer Won The Game`);
    return;
  }
}

//items

async function playPillAnimation() {
  //if there is no imgaes and no array then return // it is If guard
  if (!dealerEls || !dealerEls.length) return;

  timeLeft = 2;
  dealerEls[0].src = "./assets/dealer-holding-pill.png";
  await waitXSec(2000);

  timeLeft = 2;
  dealerEls[0].src = "./assets/dealer-taking-pill.png";
  await waitXSec(2000);

  timeLeft = 2;
  dealerEls[0].src = "./assets/dealer-after-pill.png";
  await waitXSec(2000);


  if (timeLeft <= 0) {
    dealerEls[0].src = "./assets/dealer.png";
  }
}
//pill
async function takePill() {
  //if pill = 0 then return and don't do anything
  // I did not write one for the Dealer because his rules are predefined
  if ((items[0][1] === 0 && playerTurn === true) || (items[4][1] === 0 && playerTurn === false)) {
    return;
  }
  //max health is 4
  if (playerHealth < 4 && playerTurn === true) {


    playerHealth += 1
    items[0][1] -= 1



  } else if (dealerHealth < 4 && playerTurn === false) {

    dealerHealth += 1
    items[4][1] -= 1
    await playPillAnimation();
    updateHearts(playerHealth, dealerHealth);


    return
  }
}

//useMagnifier

async function dealerMagnifierImg() {
  //if there is no imgaes and no array then return // it is If guard
  if (!dealerEls || !dealerEls.length) return;

  dealerEls[0].src = "./assets/dealer-magnifier.png";
  await waitXSec(2000);

  dealerEls[0].src = "./assets/dealer.png";

}

async function playerMagnifierImg() {
  if (!magnifierResultEl) return;

  if (chamber[chamber.length - 1] === 1) {
    magnifierResultEl.src = "./assets/magnifier_live_shell.png";
  } else {
    magnifierResultEl.src = "./assets/magnifier_empty_shell.png";
  }

  magnifierResultEl.hidden = false;
  await waitXSec(2000);

  magnifierResultEl.hidden = true;
  magnifierResultEl.removeAttribute("src");
}


async function useMagnifier() {
  if (((items[1][1] === 0 && playerTurn === true) || isMagnifierUsed === true) || ((items[5][1] === 0 && playerTurn === false) || isMagnifierUsed === true)) {

    return;
  }

  if (playerTurn === true) {
    items[1][1] -= 1
    isMagnifierUsed = true
    await playerMagnifierImg()

  }
  else {
    await dealerMagnifierImg()
    isMagnifierUsed = true
    items[5][1] -= 1
  }

}
async function dealerHandSawImg() {
  //if there is no imgaes and no array then return // it is If guard
  if (!dealerEls || !dealerEls.length) return;
  timeLeft = 0.25;

  dealerEls[0].src = "./assets/dealer-handsaw-1.png";
  await waitXSec(250);

  timeLeft = 0.25;
  dealerEls[0].src = "./assets/dealer-handsaw-2.png";
  await waitXSec(250);

  timeLeft = 0.25;
  dealerEls[0].src = "./assets/dealer-handsaw-3.png";
  await waitXSec(250);

  timeLeft = 0.25;
  dealerEls[0].src = "./assets/dealer-handsaw-4.png";
  await waitXSec(250);

  if (timeLeft <= 0) {
    dealerEls[0].src = "./assets/dealer.png";
  }
}

//Hand Saw
async function useHandSaw() {

  if (((items[2][1] === 0 && playerTurn === true) || isSawUsed === 1) || ((items[6][1] === 0 && playerTurn === false) || isSawUsed === 1)) {
    return false;
  }

  if (playerTurn === true) {
    isSawUsed = true
    items[2][1] -= 1
    return true
  }
  else {
    items[6][1] -= 1
    isSawUsed = true
    await dealerHandSawImg();
    return true;
  }

}




//Handcuff

async function playerHandcuffImg() {
  //if there is no images and no array then return // it is If guard
  if (!dealerEls || !dealerEls.length) return;

  dealerEls[0].src = "./assets/dealer-cuffed.png";


}

async function dealerHandcuffImg() {
  //if there is no images and no array then return // it is If guard
  if (!dealerEls || !dealerEls.length) return;

  timeLeft = 1;
  dealerEls[0].src = "./assets/dealer-handcufd.png";
  await waitXSec(2000);


  if (timeLeft <= 0) {
    dealerEls[0].src = "./assets/dealer.png";
  }
}

async function useHandcuff() {
  if (((items[3][1] === 0 && playerTurn === true) || isCuffUsed === true) || ((items[7][1] === 0 && playerTurn === false) || isCuffUsed === true)) {
    return isCuffUsed;
  }

  if (playerTurn === true) {
    items[3][1] -= 1
    isCuffUsed = true
    await playerHandcuffImg();
    return true;
  }
  else {
    items[7][1] -= 1
    isCuffUsed = true
    await dealerHandcuffImg();
    return true;
  }
}


function getRandomMinToMax(min, max) {
  //I searched the opposite of floor because the if I put it as floor the chances of getting 8 water bullets is so low 
  return Math.round(Math.random() * (max - min) + min);
}

function updateTextItems() {
  takePillBtn.textContent = `Pill [${items[0][1]}]`
  useMagnifierBtn.textContent = `Magnifier [${items[1][1]}]`
  useHandSawBtn.textContent = `Hand Saw [${items[2][1]}]`
  useHandcuffBtn.textContent = `Handcuff [${items[3][1]}]`
}


//Counting number of live shells and empty ones
function countingLiveandEmptyShells() {
  liveShell = 0
  emptyShell = 0
  for (let index = 0; index < chamber.length; index++) {

    if (chamber[index] === 1) {
      liveShell = liveShell + 1

    } else if (chamber[index] === 0) {
      emptyShell = emptyShell + 1
    }


  }
}

//Check Probability to decide wither to shoot Player or Dealer
async function checkProbability() {


  // Counting the number of live shells and empty shells
  countingLiveandEmptyShells();
  //================================================

  await takePill();

  //if true then the dealer will shoot if false he will shoot himself
  if ((liveShell > emptyShell) || (emptyShell === liveShell)) {
    if (dealerHealth < 4) {

    }
    if (items[5][1] === 0) {
      await useHandSaw()
    }
    if (items[5][1] === 1 && (emptyShell === liveShell)) {
      await useMagnifier()

      if (chamber[chamber.length - 1] === 1) {
        await useHandSaw();
        await useHandcuff();
        console.log(`used magnifier and shot player`);

        return true
      }
      else {
        console.log(`used magnifier and shot himself`);
        return false
      }

    }
    else {
      return true

    }
  }
  else {
    console.log('dealer shoot himself');

    return false;
  }
}


//https://stackoverflow.com/questions/16043755/modifying-img-src-using-innerhtml
async function showShellsTwoSec() {
  if (!shellsEls) return;
  shellsEls.innerHTML = "";
  timeLeft = 4;

  for (let index = 0; index < liveShell; index++) {
    shellsEls.innerHTML += '<img src="/assets/live-shell.png" alt="live-shell" class="shell-live">';
  }

  for (let index = 0; index < emptyShell; index++) {
    shellsEls.innerHTML += '<img src="/assets/empty-shell.png" alt="empty-shell" class="shell-empty">';
  }
  await waitXSec(4000);


  shellsEls.innerHTML = "";


}

function reloadChamber() {

  giveItems();
  updateTextItems();


  for (let index = 0; index < numberOfBullets; index++) {

    if (Math.random() >= 0.5) {
      chamber.push(1)
    }
    else {
      chamber.push(0)
    }



  }


  console.log(chamber);

  //Counting so it does not reveal the order of what is in the chamber
  countingLiveandEmptyShells();

  showShellsTwoSec();
}



function waitXSec(sec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      timeLeft = 0;
      resolve();
    }, sec / SPEED);
  });
}

//https://stackoverflow.com/questions/38060349/replace-image-by-javascript

//I already know about async
//but I still took from MDN
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

async function swapDealerShootingImg() {
  checkChamper();
  //if there is no imgaes and no array then return // it is If guard
  if (!dealerEls || !dealerEls.length) return;
  timeLeft = 1;

  dealerEls[0].src = "./assets/dealer-aiming.png";
  await waitXSec(1000);
  console.log(chamber);

  if (chamber[chamber.length - 1] === 1) {
    dealerEls[0].src = "./assets/dealer-shooting.png";
    updateHearts(playerHealth, dealerHealth);
    timeLeft = 1;

    await liveShellEl.play();
    await waitXSec(1000);

  }

  if (chamber[chamber.length - 1] === 0) {
    emptyShellEl.play()
  }
  timeLeft = 1;

  await waitXSec(1000);


  dealerEls[0].src = "./assets/dealer.png";
  checkWinner();

}

async function swapDealerShootingSelfImg() {
  checkChamper();

  //if there is no imgaes and no array then return // it is If guard
  if (!dealerEls || !dealerEls.length) return;
  timeLeft = 1;

  dealerEls[0].src = "./assets/dealer-aiming-self.png";

  await waitXSec(1000);


  if (chamber[chamber.length - 1] === 1) {
    dealerEls[0].src = "./assets/dealer-shooting-self.png";
    updateHearts(playerHealth, dealerHealth);
    timeLeft = 0.5;

    await liveShellEl.play();
    await waitXSec(500);
  }
  else if (chamber[chamber.length - 1] === 0) {
    await emptyShellEl.play();
    timeLeft = 1;


    await waitXSec(1000);
  }

}

function checkChamper() {
  //Check if there is nothing in chamber, if true; reload.
  if (chamber.length === 0) {
    reloadChamber();

  }
}
// async so it does wait to check if chamber have live or empty shell before deciding to show img of fire or not 
async function dealerTurn() {
  toggleButtons();
  if (gameEnd === true) {
    return;
  }
  //Dealer's Turn
  dealerDecision = await checkProbability();

  if (dealerDecision) {
    checkChamper()
    if (chamber[chamber.length - 1] === 1) {
      playerHealth = playerHealth - 1
      await swapDealerShootingImg();

      console.log(playerHealth);
      chamber.pop()
      console.log(chamber);
      playerTurn = true

    } else {
      await swapDealerShootingImg();

      playerTurn = true;

      chamber.pop()

    }
    console.log(`player health ${playerHealth} 
        dealer health: ${dealerHealth}`);
  }
  else {
    if (chamber[chamber.length - 1] === 1) {
      await swapDealerShootingSelfImg();
      await showDealerShot();


      dealerHealth = dealerHealth - 1
      chamber.pop()
      console.log(chamber);
      playerTurn = true

      updateHearts(playerHealth, dealerHealth);


    } else {
      await swapDealerShootingSelfImg();

      playerTurn = false;
      chamber.pop()
      checkChamper()
      dealerTurn()
    }

  }



  checkChamper()

  console.log(`player health ${playerHealth} 
   dealer health: ${dealerHealth}`);
  toggleButtons();

}


function updateHearts(playerHealth, dealerHealth) {


  playerHeartsEl.forEach((heart, index) => {
    heart.classList.toggle("lost-heart", index >= playerHealth);
  });

  dealerHeartsEl.forEach((heart, index) => {
    heart.classList.toggle("lost-heart", index >= dealerHealth);
  });
}


function shootChamber(xHealth) {
  isMagnifierUsed = false


  console.log("shot", { shell: chamber[chamber.length - 1], playerTurn });
  console.log("shot");
  if (chamber[chamber.length - 1] === 1) {


    if (isSawUsed === true) {
      console.log("success");
      xHealth -= 2
      updateHearts(playerHealth, dealerHealth);

      chamber.pop()
      console.log(chamber);
      isSawUsed = false




    }
    else if (isSawUsed === false) {
      console.log("normal shot");

      xHealth -= 1
      updateHearts(playerHealth, dealerHealth);

      chamber.pop()
    }

    //if the player did not shoot himself with live shell; player gets to go again
    if (playerTurn === true) {
      liveShellEl.play();


      playerTurn = false


      //if player Cuffed Dealer; Player gets to go again
      if (isCuffUsed === true) {
        playerTurn = true
        isCuffUsed = false
      }
    }
    else if (playerTurn === false) {
      playerTurn = true
      //if Dealer Cuffed Player; Dealer gets to go again
      if (isCuffUsed === true) {
        playerTurn = false
        isCuffUsed = false
      }
    }
    return xHealth;

  }

  else {

    chamber.pop()
    if (playerTurn === true) {
      emptyShellEl.play();

      if (shotPlayer === true) {
        playerTurn = true
        shotPlayer = false
        shotDealer = false
      }
      else {
        playerTurn = false
        shotPlayer = false
        shotDealer = false
      }

    }
    else if (playerTurn === false) {
      if (shotPlayer === true) {
        playerTurn = true
        shotPlayer = false
        shotDealer = false

      }
      else {
        playerTurn = false
        shotPlayer = false
        shotDealer = false

      }

    }

    checkChamper();
    return xHealth;

  }



}

// Items Functions

function giveItems() {
  let numberofItems = getRandomMinToMax(1, 2)
  let whatItem

  for (let index = 0; index < 9; index++) {
    whatItem = getRandomMinToMax(1, 4)


    if (numberofItems === 2 && index === 0) {
      items[whatItem - 1][1] += 2
    }
    else {
      items[whatItem - 1][1] += 1

    }
  }

  for (let index = 0; index < 2; index++) {
    whatItem = getRandomMinToMax(5, 8)


    if (numberofItems === 2 && index === 0) {
      items[whatItem - 1][1] += 2
    }
    else {
      items[whatItem - 1][1] += 1

    }
  }

  console.log(items);

}

async function showDealerShot() {
  //if there is no imgaes and no array then return // it is If guard
  if (!dealerEls || !dealerEls.length) return;
  timeLeft = 0.5;

  dealerEls[0].src = "./assets/dealer-wet-1.png";
  await waitXSec(500);

  timeLeft = 0.5;

  dealerEls[0].src = "./assets/dealer-wet-2.png";

  await waitXSec(500);


  dealerEls[0].src = "./assets/dealer.png";

}
//==========================

// Event Listeners

openInstructionsButtonEl.addEventListener('click', () => {
  instructionsModalEl.showModal()
})

closeInstructionsButtonEl.addEventListener('click', () => {
  instructionsModalEl.close()
})

startButtonEl.addEventListener('click', () => {
  //https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/display
  // startButtonEl.style.display = 'none'
  gameStartedEl.removeAttribute("hidden")
  console.log(gameStartedEl);
  panelEl.style.display = 'none'

  reloadChamber();

})


shootDealer.addEventListener('click', async () => {
  //after dealing some damage this functions will update the number of hearts the (player/dealer) have
  updateHearts(playerHealth, dealerHealth);


  if (gameEnd === true) {
    return;
  }

  shotDealer = true


  dealerHealth = shootChamber(dealerHealth);
if (chamber[chamber.length -1] === 1) {
  await showDealerShot();
  
}
  dealerEls[0].src = "./assets/dealer.png";
  //after dealing some damage this functions will update the number of hearts the (player/dealer) have
  updateHearts(playerHealth, dealerHealth);






  checkWinner();
  if (gameEnd === true) return;



  //Check if there is nothing in chamber, if true; reload.
  checkChamper();

  if (playerTurn === true) return;


  dealerTurn();
})

//Logic When the Player shoot himself
shootPlayer.addEventListener('click', async () => {
  if (gameEnd === true) {
    return;
  }

  shotPlayer = true
  playerHealth = shootChamber(playerHealth);


  //after dealing some damage this functions will update the number of hearts the (player/dealer) have
  updateHearts(playerHealth, dealerHealth);


  checkWinner();
  if (gameEnd === true) return;


  //Check if there is nothing in chamber, if true; reload.
  checkChamper();

  //if he did not shot himself with live shell; then granted another round
  if (playerTurn === true) return;

  //Dealer's Turn
  dealerTurn();


})

takePillBtn.addEventListener('click', async () => {
  if (gameEnd === true) {
    return;
  }

  await takePill(playerHealth);
  //after dealing some damage this functions will update the number of hearts the (player/dealer) have
  updateHearts(playerHealth, dealerHealth);

  updateTextItems();

})


useMagnifierBtn.addEventListener('click', () => {
  if (gameEnd === true) {
    return;
  }

  useMagnifier();
  updateTextItems();

})


useHandSawBtn.addEventListener('click', async () => {
  if (gameEnd === true) {
    return;
  }

  isSawUsed = await useHandSaw();
  console.log(isSawUsed);
  updateTextItems();

})


useHandcuffBtn.addEventListener('click', async () => {
  if (gameEnd === true) {
    return;
  }

  isCuffUsed = await useHandcuff();
  console.log(isCuffUsed);
  updateTextItems();

})
