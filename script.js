import { updateBird, setupBird, getBirdRect } from "./bird.js"
import { updatePipes, setupPipes, getPassedPipesCount, getPipesRects } from "./pipe.js"

//variables
const title = document.querySelector('[data-title]')
const subtitle = document.querySelector('[data-subtitle]')
let lastTime            //the last time through update loop

document.addEventListener('keypress', handleStart, { once: true })        //starts the game

//functions
function updateLoop(time) {      //creates a game loop
    if (lastTime == null) {     //skips first loop
        lastTime = time         //tracks time between calls
        window.requestAnimationFrame(updateLoop)
        return                  
    }
    const delta = time - lastTime       //gets time between animation frames, can use time to allow bird to move accordingly depending on the time passed between frames
    updateBird(delta)
    updatePipes(delta)
    if (checklose()) return handleLose()        //stops game when checklose is true
    lastTime = time
    window.requestAnimationFrame(updateLoop)
}//end function

function checklose() {                          //checks losing conditions
    const birdRect = getBirdRect()              //gets bird rectangle
    const insidePipe = getPipesRects().some(rect => isCollision(birdRect, rect))    //checks if bird collides with pipes    
    const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight    //checks if bird passing the threshold of the screen   

    return outsideWorld || insidePipe
}//end function

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top 
    )
}

function handleStart() {
    title.classList.add('hide')                 //hides start text when the game begins
    setupBird()
    setupPipes()
    lastTime = null                             //prevents delta from increasing after the game is lost, causing a bug in the bird speed
    window.requestAnimationFrame(updateLoop)
}//end function

function handleLose() {                 //handles losing logic
    setTimeout(() => {                  //prevents accidental restart from delay in pressing the space bar while playing
        title.classList.remove('hide')          //rerenders the title and score
        subtitle.classList.remove('hide')
        subtitle.textContent = `${getPassedPipesCount()} Pipes`        //renders score
        document.addEventListener('keypress', handleStart, { once: true })    //restarts game
    }, 100)
}//end function