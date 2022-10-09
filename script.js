const time = document.querySelector("#pomodoro-time");
const pomodoroTimer = document.querySelector("#pomodoro");
const breakTimer = document.querySelector("#break");

let timerId = null;

const timer = {
    pomodoroMinutes: 25,
    breakMinutes: 5,
    seconds: 0
};

const minutesSeconds = time.textContent.split(":");

/////////////////////////////////////////////////////////////

pomodoroTimer.addEventListener('click', function() {
    pomodoroTimer.classList.add('active');
    breakTimer.classList.remove('active');
    createTime(timer.pomodoroMinutes);
});

breakTimer.addEventListener('click', function() {
    breakTimer.classList.add('active');
    pomodoroTimer.classList.remove('active');
    createTime(timer.breakMinutes);
});

/////////////////////////////////////////////////////////////

function createTime(minutes) {
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    minutesSeconds[0] = minutes;
    minutesSeconds[1] = '0' + timer.seconds;
    time.textContent = minutesSeconds.join(':');
    startButton.textContent = 'start';
    clearInterval(timerId);
}

/////////////////////////////////////////////////////////////

function makeCountdown() {
    minutes = +minutesSeconds[0];
    seconds = +minutesSeconds[1];

    seconds--;

    if (seconds < 0) {
        seconds = 59;
        minutes--
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    if (seconds <= 0 && minutes <= 0) {
        clearInterval(timerId);
        startButton.textContent = 'start';

        if (pomodoroTimer.classList.contains('active')) {
            minutes = timer.pomodoroMinutes;
        } else if (breakTimer.classList.contains('active')) {
            minutes = '0' + timer.breakMinutes;
        }
    }

    minutesSeconds[0] = minutes;
    minutesSeconds[1] = seconds;
    time.textContent = minutesSeconds.join(":");
}

/////////////////////////////////////////////////////////////

const startButton = document.querySelector('#start');

startButton.addEventListener('click', function() {
    if (startButton.textContent === 'start') {
        startButton.textContent = 'stop';
        timerId = setInterval(makeCountdown, 1);
    } else if (startButton.textContent === 'stop') {
        startButton.textContent = 'start';
        clearInterval(timerId);
    }
})


/////////////////////////////////////////////////////////////

const resetButton = document.querySelector('#reset');

resetButton.addEventListener('click', function() {
    if (pomodoroTimer.classList.contains('active')) {
        createTime(timer.pomodoroMinutes);
    } else if (breakTimer.classList.contains('active')) {
        createTime(timer.breakMinutes);
    }
});