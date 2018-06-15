//Character class
class Characters {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

//Enemy class
class Enemy extends Characters {
    constructor(x = 50, y = 63, speed) {
        super(x, y);
        this.sprite = 'images/enemy-bug.png';
        this.speed = speed;
        allEnemies.push(this);
    }

    update(dt) {
        if(this.x < 506) {
            this.x += this.speed * dt;
        }
        else {
            this.x = -300;
        }
    };
}

//Player class 
class Player extends Characters {
    constructor(x = 205, y = 400) {
        super(x, y);
        this.sprite = 'images/char-horn-girl.png';
    };

    //distance player moves upon keypress

    handleInput(allowedKeys) {
        switch(allowedKeys) {
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

//boundaries for the player object to not move off board
//player enters other side of screen classic arcade style
//checks for collisions and if player won game
    update() {
        if (this.x < 5) {
            this.x = 405;
        }
        else if (this.x > 405) {
            this.x = 5;
        }

       if (this.y < 0) {
           this.y = 0;
        }
        else if (this.y > 400) {
            this.y = 400;
        }

        checkCollisions();
        winGame();
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

const allEnemies = [];

const enemy1 = new Enemy(-10, 63, 100);
const enemy2 = new Enemy(-300, 63, 100);
const enemy3 = new Enemy(-10, 147, 50);
const enemy4 = new Enemy(-300, 147, 50);
const enemy5 = new Enemy(-10, 231, 25);
const enemy6 = new Enemy(-300, 231, 25)


// Place the player object in a variable called player
const player = new Player(205, 400); 


//return player to starting point
const resetPlayer = () => {
  player.x = 205;
  player.y = 400;
}

//check for collision
const checkCollisions = () => {
        for (enemy of allEnemies) {
            let playerWidth = 90;
            let enemyWidth = 90;
            let playerHeight = 90;
            let enemyHeight = 75;
            if (enemy.x < player.x + playerWidth &&
                enemy.x + enemyWidth > player.x &&
                enemy.y < player.y + playerHeight &&
                enemy.y + enemyHeight > player.y) {
                resetPlayer();
                }
        }
    }


//alert when player reaches water and wins
const win = () => {
    alert("You've won! Great job dodging those bugs!");
}

//checks if player won the game
function winGame() {
    setTimeout(function(){
        if (player.y === 0) {
            win();
            resetPlayer();
        }
    }, 250);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
