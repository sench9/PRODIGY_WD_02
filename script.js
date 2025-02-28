let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCount = 0;
let previousLapTime = 0;

const timeDisplay = document.querySelector('.time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsContainer = document.getElementById('laps');
const themeToggle = document.getElementById('theme-toggle');
const lapSound = document.getElementById('lap-sound');

// Function to format time in HH:MM:SS
function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds, 2)}`;
}

// Function to pad numbers with leading zeros
function padZero(num, length = 2) {
    return String(num).padStart(length, '0');
}

// Function to start the timer
function startTimer() {
    if (timerInterval) return;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timeDisplay.textContent = formatTime(elapsedTime);
    }, 10);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
}

// Function to pause the timer
function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    lapCount = 0;
    previousLapTime = 0;
    timeDisplay.textContent = '00:00:00';
    lapsContainer.innerHTML = '';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

// Function to record a lap
function recordLap() {
    if (!timerInterval) return;
    lapCount++;
    const lapTime = elapsedTime;
    const lapDifference = lapTime - previousLapTime;
    previousLapTime = lapTime;

    const lapElement = document.createElement('div');
    lapElement.textContent = `Lap ${lapCount}: ${formatTime(lapTime)} (${formatTime(lapDifference)})`;
    lapsContainer.appendChild(lapElement);

    // Play lap sound
    lapSound.currentTime = 0;
    lapSound.play();
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
themeToggle.addEventListener('change', toggleDarkMode);