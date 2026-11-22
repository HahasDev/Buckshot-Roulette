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
[0,0],// Player's pill
[0,0],// Player's magnifier
[0,0],// Player's handsaw
[0,0],// Player's handcuff
//Dealer's items
[1,0],//Dealer's pill
[1,0],//Dealer's magnifier
[1,0],//Dealer's handsaw
[1,0],//Dealer's handcuff
]


let shotPlayer = false
let shotDealer = false
let gameEnd = false
let playerWon = false

let isSawUsed = false
let isCuffUsed = false

let numberOfBullets = getRandomMinToMax(3,8)

 let liveShell = 0
 let emptyShell = 0



//functions

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
    } else if(gameEnd === true && playerWon === false)
    {
      console.log(`Dealer Won The Game`);
      return;
    } 
}

//items

//pill
function takePill(player) {
  //if pill = 0 then return and don't do anything
  // I did not write one for the Dealer because his rules are predefined
  if (items[0][1] === 0) {
    return;
  }
  if (player < 4) {

    if (playerTurn === true) {
        playerHealth += 1
        items[0][1] -= 1
    }
    else
      {
        dealerHealth += 1
        items[4][1] -= 1
      }

  } else {
    return
  }
}

//useMagnifier


function useMagnifier() {
  if ( (items[1][1] === 0 && playerTurn === true) || (items[5][1] && playerTurn === false) ) {

    return;
  }

  if (playerTurn === true) {
        items[1][1] -= 1
  }
  else
  {
    items[5][1] -= 1
  }

}


//Hand Saw
function useHandSaw() {
  
if ( (items[2][1] === 0 && playerTurn === true) || (items[6][1] && playerTurn === false) ) {
    return false;
  }

  if (playerTurn === true) {
   
      items[2][1] -= 1
      return true
  }
  else
  {
    items[6][1] -= 1
    return true;
  }
 
}




function useHandcuff(){
    if ( (items[3][1] === 0 && playerTurn === true) || (items[7][1] && playerTurn === false) ) {
    return;
  }

  if (playerTurn === true) {
        items[3][1] -= 1
    return true;

  }
  else
  {
    items[7][1] -= 1
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
      
    } else if (chamber[index] === 0)
      {
        emptyShell = emptyShell + 1
      }
      
      
    }
}

//Check Probability to decide wither to shoot Player or Dealer
function checkProbability() {
 
  
  // Counting the number of live shells and empty shells
  countingLiveandEmptyShells();
    //================================================
    
    console.log(liveShell);
    console.log(emptyShell);
    
    //if true then the dealer will shoot if false he will shoot himself
    if ((liveShell > emptyShell) || (emptyShell === 1 && liveShell === 1)) {
      console.log('dealer shot you');
      return true;
    } else {
      console.log('dealer did not shoot you');
      
      return false;
    }
  }
  function reloadChamber() {
  
  giveItems();
  updateTextItems();
  
  
    for (let index = 0; index < numberOfBullets; index++) {
    
         if (Math.random() >= 0.5) {
           chamber.push(1)
         }
         else
         {
           chamber.push(0)
         }
         
    
    
        }
      
    
    console.log(chamber);

    //Counting so it does not reveal the order of what is in the chamber
    countingLiveandEmptyShells();
  
    if (!shellsEls) return;
    shellsEls.innerHTML = "";

  
    for (let index = 0; index < liveShell; index++) {      
     shellsEls.innerHTML += '<img src="/assets/live-shell.jpg" alt="live-shell" class="shell-img">';
    }

    for (let index = 0; index < emptyShell; index++) {
      shellsEls.innerHTML += '<img src="/assets/empty-shell.jpg" alt="empty-shell" class="shell-img">';
    }
    
  }
  

function checkChamper() {
   //Check if there is nothing in chamber, if true; reload.
    if (chamber.length === 0) {
      reloadChamber();
      
    }
}

function dealerTurn() {
  if (gameEnd === true) {
    return;
  }
  //Dealer's Turn
    dealerDecision = checkProbability();

    if (dealerDecision) {
      if (chamber[chamber.length -1] === 1) {

      playerHealth = playerHealth - 1
      console.log(playerHealth);
      chamber.pop()
      console.log(chamber);
      playerTurn = true
      
     } else {
      playerTurn = true;

      chamber.pop()
      
     }
     console.log(`player health ${playerHealth} 
      dealer health: ${dealerHealth}`);
    }
    else{
    if (chamber[chamber.length -1] === 1) {

      dealerHealth = dealerHealth - 1
      chamber.pop()
      console.log(chamber);
      playerTurn = true
      
     } else {
      playerTurn = false;
      chamber.pop()
      checkChamper()
      dealerTurn()   
     }

  }


  checkWinner();
   if (gameEnd === true && playerWon === true) {
      console.log(`Player Won $70,000`);
    } else if(gameEnd === true && playerWon === false)
    {
      console.log(`Dealer Won The Game`);
      
    } 

    checkChamper()

    console.log(`player health ${playerHealth} 
      dealer health: ${dealerHealth}`);
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

  console.log("shot");
    if (chamber[chamber.length -1] === 1) {


      if (isSawUsed === true) {
        console.log("success");
      xHealth -= 2
      chamber.pop()
      console.log(chamber);
      isSawUsed = false


      

      }
      else if(isSawUsed === false)
      {
        console.log("normal shot");
        xHealth -= 1
        chamber.pop()
      }
      
     if (playerTurn === true) {
      //if the player did not shoot himself with live shell; player gets to go again
      if (xHealth !== playerHealth) {
        playerTurn = false
      }

      //if player Cuffed Dealer; Player gets to go again
      if (isCuffUsed === true) {
        playerTurn = true
        isCuffUsed = false
      }
     }
      else if(playerTurn === false) 
      {
      dealerHealth -= 1
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
      checkChamper();
      return xHealth;
    
    }
   


}

// Items Functions

function giveItems() {
    let numberofItems = getRandomMinToMax(1, 2)
    let whatItem 

  for (let index = 0; index < 2; index++) {
    whatItem = getRandomMinToMax(1, 4)
  

    if (numberofItems === 2 && index === 0) {
      items[whatItem -1 ][1] += 2
    }
    else
    {
      items[whatItem -1 ][1] += 1

    }
  }

  for (let index = 0; index < 2; index++) {
    whatItem = getRandomMinToMax(5, 8)
  

    if (numberofItems === 2 && index === 0) {
      items[whatItem -1 ][1] += 2
    }
    else
    {
      items[whatItem -1 ][1] += 1

    }
  }

  console.log(items);

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


shootDealer.addEventListener('click', () => {
  //after dealing some damage this functions will update the number of hearts the (player/dealer) have
  updateHearts(playerHealth, dealerHealth);

  if (gameEnd === true) {
    return;
  }
  
  dealerHealth = shootChamber(dealerHealth);

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
shootPlayer.addEventListener('click', () => {
    if (gameEnd === true) {
    return;
  }

  
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

takePillBtn.addEventListener('click', () => {
takePill(playerHealth);
//after dealing some damage this functions will update the number of hearts the (player/dealer) have
updateHearts(playerHealth, dealerHealth);

updateTextItems();

})


useMagnifierBtn.addEventListener('click', () => {
useMagnifier();
updateTextItems();

})


useHandSawBtn.addEventListener('click', () => {
isSawUsed = useHandSaw();
console.log(isSawUsed);
updateTextItems();

})


useHandcuffBtn.addEventListener('click', () => {
isCuffUsed = useHandcuff();
console.log(isCuffUsed);
updateTextItems();

})
