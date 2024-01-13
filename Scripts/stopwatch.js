import {navBar} from './nav-bar.js';

navBar();

const startButtonElement = document.querySelector('.js-start');
const pauseButtonElement = document.querySelector('.js-pause')
const resetButtonElement = document.querySelector('.js-reset');
const timeTextElement = document.querySelector('.js-time');
const timeTitleDisplay = document.querySelector('.js-title');

let stopWatch;
let timerID;
let milliSecondsRight = 0;
let milliSecondsLeft = 0;
let secondsRight = 0;
let secondsLeft = 0;
let minutesRight = 0;
let minutesLeft = 0;
let hoursRight = 0;
let hoursLeft = 0;

pauseButtonElement.classList.add('hide');

startButtonElement.addEventListener('click', () => {
  stopWatch = !stopWatch;

  startButtonElement.classList.add('hide');
  pauseButtonElement.classList.remove('hide');
  resetButtonElement.classList.add('reset-off');

  timerID = setInterval(() =>{
    milliSecondsRight ++

    if(milliSecondsRight === 10) {
      milliSecondsRight = 0;
      milliSecondsLeft ++;
    }

    if(milliSecondsLeft === 10) {
      milliSecondsLeft = 0;
      secondsRight ++;
    }

    if (secondsRight === 10) {
      secondsRight= 0;
      secondsLeft ++;
    }

    if (secondsLeft === 6) {
      secondsLeft = 0;
      minutesRight ++;
    }

    if (minutesRight === 10) {
      minutesRight = 0;
      minutesLeft ++;
    }

    if (minutesLeft === 6) {
      minutesLeft = 0;
      hoursRight ++;
    }

    if (hoursRight === 10) {
      hoursRight = 0;
      hoursLeft ++
    }
    
    timeTextElement.innerHTML = `${hoursRight}${hoursLeft} : ${minutesLeft}${minutesRight} : ${secondsLeft}${secondsRight}<span>.</span><div>${milliSecondsLeft}${milliSecondsRight}</div>`;
    timeTitleDisplay.innerHTML = `${hoursRight}${hoursLeft} : ${minutesLeft}${minutesRight} : ${secondsLeft}${secondsRight}`;
  }, 10)
});

pauseButtonElement.addEventListener('click', () =>{
    clearInterval(timerID);
    stopWatch = !stopWatch;
    pauseButtonElement.classList.add('hide');
    startButtonElement.classList.remove('hide');
    resetButtonElement.classList.remove('reset-off');
});

resetButtonElement.addEventListener('click', () =>{
  if(!stopWatch) {
    milliSecondsRight = 0;
    milliSecondsLeft = 0;
    secondsRight = 0;
    secondsLeft = 0;
    minutesRight = 0;
    minutesLeft = 0;
    hoursRight = 0;
    hoursLeft = 0;
    timeTextElement.innerHTML = `${hoursRight}${hoursLeft} : ${minutesLeft}${minutesRight} : ${secondsLeft}${secondsRight}<span>.</span><div>${milliSecondsLeft}${milliSecondsRight}</div>`;
    timeTitleDisplay.innerHTML = `${hoursRight}${hoursLeft} : ${minutesLeft}${minutesRight} : ${secondsLeft}${secondsRight}`;
  }
});