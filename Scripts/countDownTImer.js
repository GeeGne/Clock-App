import {navBar} from './nav-bar.js';

navBar();

const startButtonElement = document.querySelector('.js-start');
const resetButtonElement = document.querySelector('.js-reset');
const timeTextElement = document.querySelector('.js-time');
const inputHoursElement = document.querySelector('.js-hours-data');
const hoursDataListElement = document.querySelector('.js-hours-datalist');
const inputMinutesElement = document.querySelector('.js-minutes-data');
const minutesDataListElement = document.querySelector('.js-minutes-datalist');
const inputSecondsElement = document.querySelector('.js-seconds-data');
const secondsDataListElement = document.querySelector('.js-seconds-datalist');
const errorMessageElement = document.querySelector('.js-error');
const timeTitleElement = document.querySelector('.js-time-title');
const alarmAudioElement = new Audio('./Ringtones/alarm.mp3');
const alarmMessageElement = document.querySelector('.js-alarm-message');
const alarmDisplayElement = document.querySelector('.js-timer');
const alarmButtonElement = document.querySelector('.js-alarm-button');


let stopWatch;
let timerID;
let milliSeconds = 0;
let secondsRight = 0;
let secondsLeft = 0;
let minutesRight = 0;
let minutesLeft = 0;
let hoursRight = 0;
let hoursLeft = 0;

startButtonElement.addEventListener('click', () => {
  if(!stopWatch &&
    secondsRight === 0 &&
    secondsLeft === 0 &&
    minutesRight === 0 &&
    minutesLeft === 0 &&
    hoursRight === 0 &&
    hoursLeft === 0) {
      startButtonElement.classList.add('reset-off');
    return;
  } 
  
  if (!stopWatch) {
    stopWatch = !stopWatch;
    startButtonElement.innerText = 'Stop';
    startButtonElement.classList.add('timer-on');
    resetButtonElement.classList.add('reset-off');

    timerID = setInterval(() =>{
      milliSeconds ++
      if(milliSeconds === 100) {
        milliSeconds = 0;
        secondsRight --;
      }
      if (secondsRight === -1) {
        secondsRight= 9;
        secondsLeft --;
      }

      if (secondsLeft === -1) {
        secondsLeft = 5;
        minutesRight --;
      }

      if (minutesRight === -1) {
        minutesRight = 9;
        minutesLeft --;
      }

      if (minutesLeft === -1) {
        minutesLeft = 5;
        hoursRight --;
      }

      if (hoursRight === -1) {
        hoursRight = 9;
        hoursLeft --
      }
      updateTimeDisplay();
      if (hoursLeft === -1) {
        playAlarm();
        resetAllDigits();
        updateTimeDisplay();
        clearInterval(timerID);
        stopWatch = !stopWatch;
        startButtonElement.innerText = 'Start';
        startButtonElement.classList.remove('timer-on');
        resetButtonElement.classList.remove('reset-off');
      } 
    }, 10);
  } else {
    clearInterval(timerID);
    stopWatch = !stopWatch;
    startButtonElement.innerText = 'Start';
    startButtonElement.classList.remove('timer-on');
    resetButtonElement.classList.remove('reset-off');
  }
});

resetButtonElement.addEventListener('click', () =>{
  if(!stopWatch) {
    resetAllDigits();
    startButtonCheck();
    updateTimeDisplay();
  }
});

function setInputDataHTML() {
  let inputDataListHTML = ``;

  for (let i = 0; i <= 24; i++) {
    inputDataListHTML += `<option value="${i}">`;
  }
  hoursDataListElement.innerHTML= inputDataListHTML;

  inputDataListHTML = '';
  for (let i = 0; i < 60; i++) {
    inputDataListHTML += `<option value="${i}">`;
  }
  minutesDataListElement.innerHTML = inputDataListHTML;
  secondsDataListElement.innerHTML = inputDataListHTML;
}

setInputDataHTML();

inputHoursElement.addEventListener('change', () =>{
  let hoursValue = Number(inputHoursElement.value);
  console.log(hoursValue);

  if (
      (!hoursValue && hoursValue !== 0) ||
      hoursValue < 0 || 
      hoursValue > 24
    ) {
    errorMessageDisplay();
  } else {
    hoursLeft = Math.floor(hoursValue / 10);
    hoursRight = Math.round((hoursValue / 10 - Math.floor(hoursValue / 10)) * 10);
    updateTimeDisplay();
    startButtonCheck();
  }

});

inputMinutesElement.addEventListener('change', () =>{
  let minutesValue = Number(inputMinutesElement.value);
  console.log(minutesValue)

  if (
    (!minutesValue && minutesValue !== 0) ||
      minutesValue < 0 || 
      minutesValue > 60
    ) {
    errorMessageDisplay();
  } else {
    minutesLeft = Math.floor(
      minutesValue / 10
      );
    minutesRight = Math.round(
      (minutesValue / 10 - Math.floor(minutesValue / 10)) * 10
      );
    updateTimeDisplay();
    startButtonCheck();
  }
  

});

inputSecondsElement.addEventListener('change', () =>{
  let secondsValue = Number(inputSecondsElement.value);

  if (
    (!secondsValue && secondsValue !== 0) ||
      secondsValue < 0 || 
      secondsValue > 60
    ) {
      errorMessageDisplay();
  } else {  
    secondsLeft = Math.floor(secondsValue / 10);
    secondsRight = Math.round((secondsValue / 10 - Math.floor(secondsValue / 10)) * 10);
    updateTimeDisplay();    
    startButtonCheck();
  }

});

alarmButtonElement.addEventListener('click', () => {
  alarmMessageElement.classList.remove('alarm-show');
  alarmButtonElement.classList.remove('alarm-show');
  alarmAudioElement.pause();
  clearInterval(alarmID);
  clearInterval(displayID);
});

function updateTimeDisplay () {
  timeTextElement.innerHTML = 
  `${hoursLeft}${hoursRight} : 
  ${minutesLeft}${minutesRight} :
   ${secondsLeft}${secondsRight}
   <span>.</span><div>
   ${milliSeconds}</div>`;

   timeTitleElement.innerText = `
   ${hoursLeft}${hoursRight} : 
   ${minutesLeft}${minutesRight} :
    ${secondsLeft}${secondsRight}
    `;
}

let errorMessageID;
function errorMessageDisplay () {
  errorMessageElement.classList.add('show');
  errorMessageID && clearTimeout(errorMessageID);
  errorMessageID = setTimeout(() =>{
    errorMessageElement.classList.remove('show');
  }, 3000);
}

function resetAllDigits () {
  milliSeconds = 0;
  secondsRight = 0;
  secondsLeft = 0;
  minutesRight = 0;
  minutesLeft = 0;
  hoursRight = 0;
  hoursLeft = 0;
  startButtonElement.classList.add('reset-off');
}

function startButtonCheck () {
  if(!stopWatch &&
    secondsRight === 0 &&
    secondsLeft === 0 &&
    minutesRight === 0 &&
    minutesLeft === 0 &&
    hoursRight === 0 &&
    hoursLeft === 0) {
      startButtonElement.classList.add('reset-off');
  } else {
    startButtonElement.classList.remove('reset-off');
  }
}

let alarmID;
let displayID;
function playAlarm () {
  alarmMessageElement.classList.add('alarm-show');
  alarmButtonElement.classList.add('alarm-show');

  alarmAudioElement.play();
  alarmID = setInterval(() => {
    alarmAudioElement.play();
  }, 4000);

  alarmDisplayElement.classList.add('alarm-display-on');
  setTimeout(() =>{
    alarmDisplayElement.classList.remove('alarm-display-on');
  },1000);
  displayID = setInterval(() => {
    alarmDisplayElement.classList.add('alarm-display-on');
    setTimeout(() =>{
      alarmDisplayElement.classList.remove('alarm-display-on');
    }, 1000);
  }, 2000);
}


