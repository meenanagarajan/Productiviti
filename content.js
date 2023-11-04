const blockedWebsites = [
    "https://www.youtube.com/",
    "https://www.netflix.com/",
    "https://www.instagram.com/"
];

// Function to start the Pomodoro timer
function startPomodoroTimer() {
    const workDuration = 25 * 60; // 25 minutes in seconds
    const breakDuration = 5 * 60; // 5 minutes in seconds

    const timerDisplay = document.createElement('div');
    timerDisplay.classList.add('pomodoro-timer');

    let timeLeft = workDuration;
    let timerInterval;

    // Update the timer display
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // Start the timer
    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = 'Take a break!';
                // Implement a break or reset functionality here
            }
        }, 1000);
    }

    // Add the timer display to the page
    document.body.appendChild(timerDisplay);

    // Start the Pomodoro timer
    startTimer();
}

// Call the function to start the Pomodoro timer
startPomodoroTimer();

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // Loop through the array of blocked websites
        for (const blockedWebsite of blockedWebsites) {
            if (details.url.startsWith(blockedWebsite)) {
                // Block the request by returning a blocking response
                return { cancel: true };
            }
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);


// Play background music when the extension is opened
document.addEventListener('DOMContentLoaded', function () {
    const audioElement = document.getElementById('background-music');
    audioElement.play();
});
