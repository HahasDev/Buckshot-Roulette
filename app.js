//Cached

const openInstructionsButtonEl = document.querySelector('#open-instructions')
const instructionsModalEl = document.querySelector('#instructions')
const closeInstructionsButtonEl = document.querySelector('#close-instructions')

console.log(openInstructionsButtonEl, instructionsModalEl)

// Event Listeners

openInstructionsButtonEl.addEventListener('click', () => {
    instructionsModalEl.showModal()
})

closeInstructionsButtonEl.addEventListener('click', () => {
  instructionsModalEl.close()
})
