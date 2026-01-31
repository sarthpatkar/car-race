const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
    x: 180,
    y: 500,
    width: 40,
    height: 70,
    speed: 5
};

let enemy = {
    x: Math.random() * 360,
    y: -100,
    width: 40,
    height: 70,
    speed: 4
};

let score = 0;
let gameOver = false;

// Controls
document.addEventListener("keydown", movePlayer);

function movePlayer(e) {
    if (e.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    }
    if (e.key === "ArrowRight" && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
}

// Draw rectangle car
function drawCar(car, color) {
    ctx.fillStyle = color;
    ctx.fillRect(car.x, car.y, car.width, car.height);
}

// Collision detection
function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move enemy
    enemy.y += enemy.speed;

    if (enemy.y > canvas.height) {
        enemy.y = -100;
        enemy.x = Math.random() * (canvas.width - enemy.width);
        score++;
    }

    // Check collision
    if (isColliding(player, enemy)) {
        gameOver = true;
        alert("Game Over! Score: " + score);
        location.reload();
    }

    drawCar(player, "red");
    drawCar(enemy, "black");

    // Score
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 10, 20);

    requestAnimationFrame(update);
}

update();
