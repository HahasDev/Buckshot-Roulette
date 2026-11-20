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

const champer = []

let playerHealth = 4
let dealerHealth = 4

let playerTurn = true

let shotPlayer = false
let shotDealer = false



let numberOfBullets = getRandomMinToMax(2,8)

console.log(Math.random());




//functions



function getRandomMinToMax(min, max) {
  //I searched the opposite of floor because the if I put it as floor the chances of getting 8 water bullets is so low 
  return Math.ceil(Math.random() * (max - min) + min);
}

for (let index = 0; index < numberOfBullets; index++) {

     if (Math.random() >= 0.5) {
       champer.push(1)
     }
     else
     {
       champer.push(0)
     }
     


    }
  

console.log(champer);

// Event Listeners

openInstructionsButtonEl.addEventListener('click', () => {
    instructionsModalEl.showModal()
})

closeInstructionsButtonEl.addEventListener('click', () => {
  instructionsModalEl.close()
})

startButtonEl.addEventListener('click', () => {
  //https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/display
  startButtonEl.style.display = 'none'
  gameStartedEl.removeAttribute("hidden")
  console.log(gameStartedEl);
  panelEl.style.display = 'none'
})


shootDealer.addEventListener('click', () => {
  
  console.log(champer[champer.length-1]);
    if (champer[champer.length -1] === 1) {

      dealerHealth = dealerHealth - 1
      console.log(dealerHealth);
      champer.pop()
      console.log(champer);
      playerTurn = false
      
    } else {
      

      champer.pop()

    }
    
 
    
  
})