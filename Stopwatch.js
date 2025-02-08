let timer;
        let startTime;
        let elapsedTime = 0;
        let running = false;
        let lapTimes = [];

        function formatTime(ms) {
            let hours = Math.floor(ms / 3600000);
            let minutes = Math.floor((ms % 3600000) / 60000);
            let seconds = Math.floor((ms % 60000) / 1000);
            let milliseconds = ms % 1000;
            return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}.${String(milliseconds).padStart(3,'0')}`;
        }

        function updateDisplay() {
            document.querySelector(".stopwatch").textContent = formatTime(elapsedTime);
        }

        function startStop() {
            let startStopButton = document.getElementById("startStopButton");
            if (running) {
                clearInterval(timer);
                running = false;
                startStopButton.textContent = "Start";
            } else {
                startTime = Date.now() - elapsedTime;
                timer = setInterval(() => {
                    elapsedTime = Date.now() - startTime;
                    updateDisplay();
                }, 10);                              
                running = true;                       
                startStopButton.textContent = "Stop";
            }
        }

        function reset() {
            clearInterval(timer);
            elapsedTime = 0;
            running = false;
            lapTimes = [];
            updateDisplay();
            document.querySelector(".laps").innerHTML = "";
            document.getElementById("startStopButton").textContent = "Start";
        }

        function lap() {
            if (running) {
                let lapTime = formatTime(elapsedTime);
                lapTimes.push(lapTime);
                let li = document.createElement("li");
                li.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
                document.querySelector(".laps").appendChild(li);
            } else {
                alert("Start the stopwatch to record laps.");
            }
        }