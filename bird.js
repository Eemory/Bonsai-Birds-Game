//handles bird related logic
const birdElem = document.querySelector('[data-bird')           //gets bird element
//variables
const BIRD_SPEED = 0.5
let timeSinceLastJump = Number.POSITIVE_INFINITY
const JUMP_DURATION = 125

export function setupBird() {
    setTop(window.innerHeight / 2)
    document.removeEventListener('keydown', handleJump)        //resets event listener upon game reset
    document.addEventListener('keydown', handleJump)        //allows bird to 'jump   
}//end function

export function updateBird(delta) {             //updates position depending on frame rate(delta)
    if (timeSinceLastJump < JUMP_DURATION) {
        setTop(getTop() - BIRD_SPEED * delta)       //changes bird speed depending on frame rate, moves bird up
    } else {
        setTop(getTop() + BIRD_SPEED * delta)       //changes bird speed depending on frame rate, moves bird down
    }

    timeSinceLastJump += delta
}//end function

export function getBirdRect() {
    return birdElem.getBoundingClientRect()
}

function setTop(top) {
    birdElem.style.setProperty('--bird-top', top)
}//endf function

function getTop() {
    return parseFloat(getComputedStyle(birdElem).getPropertyValue('--bird-top'))
}// end function

function handleJump(e) {
    if (e.code !== 'Space') return

    timeSinceLastJump = 0       
}// end function