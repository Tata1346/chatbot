let currentLane = 1;
let score = 0;
let gameInterval;
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
let isRunning = false;

let magnetActive = false;
let magnetTimeout;
const magnetBar = document.getElementById("magnet-bar");
const magnetStatus = document.getElementById("magnet-status");

const lanePos = [10, 110, 210];

function movePlayer() {
    player.style.left = lanePos[currentLane] + "px";
}

document.addEventListener("keydown", (e) => {
    if (!isRunning) return;

    if (e.key === "ArrowLeft" && currentLane > 0) {
        currentLane--;
    } else if (e.key === "ArrowRight" && currentLane < 2) {
        currentLane++;
    }
    movePlayer();
});

function spawnCoin() {
    const laneIndex = Math.floor(Math.random() * 3);
    const lane = document.querySelectorAll(".lane")[laneIndex];

    const coin = document.createElement("div");
    coin.classList.add("coin");
    coin.style.left = "30px";
    lane.appendChild(coin);

    let top = 0;
    const interval = setInterval(() => {
        top += 5;
        coin.style.top = top + "px";

        // ระยะการดูดของแม่เหล็ก
        const nearPlayer = top > 100 && top < 200;

        const isSameLane = laneIndex === currentLane;
        if ((isSameLane && top > 100) || (magnetActive && nearPlayer)) {
            score++;
            scoreDisplay.textContent = score;
            saveScore(score);
            coin.remove();
            clearInterval(interval);
        } else if (top > 400) {
            coin.remove();
            clearInterval(interval);
        }
    }, 50);
}

function saveScore(score) {
    fetch("score.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "score=" + score,
    });
}

function startGame() {
    if (isRunning) return;
    isRunning = true;
    score = 0;
    scoreDisplay.textContent = 0;
    gameInterval = setInterval(spawnCoin, 1200);
}

function stopGame() {
    isRunning = false;
    clearInterval(gameInterval);
    disableMagnet(); // ปิดแม่เหล็กเมื่อหยุดเกม
}

function openShop() {
    document.getElementById("shop").style.display = "block";
}

function closeShop() {
    document.getElementById("shop").style.display = "none";
}

function buyMagnet(cost, duration) {
    if (score >= cost) {
        score -= cost;
        scoreDisplay.textContent = score;
        activateMagnet(duration);
        alert("เปิดใช้งานแม่เหล็ก (" + duration + " วินาที)");
    } else {
        alert("คะแนนไม่พอ!");
    }
}

function activateMagnet(seconds) {
    if (magnetTimeout) clearTimeout(magnetTimeout);
    magnetActive = true;

    magnetStatus.style.display = "block";
    magnetBar.style.width = "100%";

    let timeLeft = seconds;
    const interval = setInterval(() => {
        timeLeft--;
        magnetBar.style.width = (timeLeft / seconds * 100) + "%";
        if (timeLeft <= 0) {
            clearInterval(interval);
        }
    }, 1000);

    magnetTimeout = setTimeout(() => {
        disableMagnet();
    }, seconds * 1000);
}

function disableMagnet() {
    magnetActive = false;
    magnetBar.style.width = "0%";
    magnetStatus.style.display = "none";
}