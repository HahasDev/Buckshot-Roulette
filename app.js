//Cached

const openInstructionsButtonEl = document.querySelector('#open-instructions')
const instructionsModalEl = document.querySelector('#instructions')
const closeInstructionsButtonEl = document.querySelector('#close-instructions')

const startButtonEl = document.querySelector('#start')
const panelEl = document.querySelector('.game-panel')
const gameStartedEl = document.querySelector('#game-started')

const shootPlayer = document.getElementById('shootPlayer')
const shootDealer = document.getElementById('shootDealer')

console.log(openInstructionsButtonEl, instructionsModalEl)
console.dir(startButtonEl);
console.log(shootDealer);



//Variables

const chamber = []

let playerHealth = 4
let dealerHealth = 4

let playerTurn = true
let dealerDecision

let shotPlayer = false
let shotDealer = false
let gameEnd = false
let playerWon = false


let numberOfBullets = getRandomMinToMax(2,8)





//functions



function getRandomMinToMax(min, max) {
  //I searched the opposite of floor because the if I put it as floor the chances of getting 8 water bullets is so low 
  return Math.ceil(Math.random() * (max - min) + min);
}

function reloadChamber() {

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
  
}



//Check Probability to decide wither to shoot Player or Dealer
function checkProbability(chamber) {
    let liveShell = 0
    let emptyShell = 0


  for (let index = 0; index < chamber.length; index++) {
    
    if (chamber[index] === 1) {
      liveShell = liveShell + 1

    } else {
      emptyShell = emptyShell + 1
    }

    
  }

console.log(liveShell);
console.log(emptyShell);
  if ((liveShell > emptyShell) || (emptyShell === 1 && liveShell === 1)) {
    console.log('dealer shot you');
    return true;
  } else {
    console.log('dealer did not shoot you');

    return false;
  }
}

function checkChamper() {
   //Check if there is nothing in chamber, if true; reload.
    if (chamber.length === 0) {
      reloadChamber();
      
    }
}

function dealerTurn() {
  //Dealer's Turn
    dealerDecision = checkProbability(chamber);

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
    
    checkChamper()

    console.log(`player health ${playerHealth} 
      dealer health: ${dealerHealth}`);
}

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
  
      if (chamber[chamber.length -1] === 1) {

      dealerHealth = dealerHealth - 1
      console.log(dealerHealth);
      chamber.pop()
      console.log(chamber);
      playerTurn = false
      
    } else {
      
      playerTurn = false;

      chamber.pop()


    }


    //Check if there is nothing in chamber, if true; reload.
   checkChamper();

    dealerTurn();
})

//Logic When the Player shoot himself
shootPlayer.addEventListener('click', () => {
  
  console.log(chamber[chamber.length-1]);
    if (chamber[chamber.length -1] === 1) {

      playerHealth = playerHealth - 1
      console.log(playerHealth + " Player Health");
      chamber.pop()
      console.log(chamber);
      playerTurn = false


      
    } else {
      chamber.pop()
      //Check if there is nothing in chamber, if true; reload.
      checkChamper();
      return;
    
    }



    
 //Check if there is nothing in chamber, if true; reload.
 checkChamper

 //Dealer's Turn
 dealerTurn();
 
    
  
})



