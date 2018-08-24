// Character class
class Characters {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

// Enemy class
class Enemy extends Characters {
    constructor(x = 50, y = 63, speed) {
        super(x, y);
        this.sprite = 'images/enemy-bug.png';
        this.speed = speed;
    }

    update(dt) {
        if (this.x < 506) {
            this.x += this.speed * dt;
        } else {
            this.x = -300;
        }
    };
}

// Player class 
class Player extends Characters {
    constructor(x = 205, y = 400, enemies = []) {
        super(x, y);
        this.sprite = 'images/char-horn-girl.png';

        this.enemies = enemies;
    };

    // distance player moves upon keypress
    handleInput(allowedKeys) {
        switch (allowedKeys) {
            case "left":
                this.x -= 100;
                break;
            case "up":
                this.y -= 86;
                break;
            case "right":
                this.x += 100;
                break;
            case "down":
                this.y += 86;
                break;
        }
    }

    // boundaries for the player object to not move off board
    // player enters other side of screen classic arcade style
    // checks for collisions and if player won game
    update() {
        // left edge
        if (this.x < 5) {
            this.x = 405;
        }
        // right edge
        if (this.x > 405) {
            this.x = 5;
        }

        // top edge
        if (this.y < 0) {
            this.y = 0;
        }
        // bottom edge
        if (this.y > 400) {
            this.y = 400;
        }

        this.checkCollisions();
        this.checkWin();
    }

    checkCollisions() {
        const playerWidth = 90;
        const enemyWidth = 90;
        const playerHeight = 90;
        const enemyHeight = 75;

        for (const enemy of this.enemies) {
            if (enemy.x < this.x + playerWidth &&
                enemy.x + enemyWidth > this.x &&
                enemy.y < this.y + playerHeight &&
                enemy.y + enemyHeight > this.y) {
                this.reset();
            }
        }
    }

    // check if the player won the game
    checkWin() {
        setTimeout(() => {
            if (this.y === 0) {
                this.win();
                this.reset();
            }
        }, 250);
    }

    // alert when player reaches water and wins
    win() {
        alert("You've won! Great job dodging those bugs!");
    }

    // return player to starting point
    reset() {
        player.x = 205;
        player.y = 400;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [
    new Enemy(-10, 63, 100),
    new Enemy(-300, 63, 100),
    new Enemy(-10, 147, 50),
    new Enemy(-300, 147, 50),
    new Enemy(-10, 231, 25),
    new Enemy(-300, 231, 25)
];

// Place the player object in a variable called player
const player = new Player(205, 400, allEnemies);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
