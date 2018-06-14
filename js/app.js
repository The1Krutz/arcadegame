/* Create classes and subclasses 
*  Characters
*  Enemies extends Characters
*  Player extends Characters
*/

class Characters {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    update(dt) {};

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

}

class Enemy extends Characters {
    constructor(x = 50, y = 63, speedX = 0, speedY = 0) {
        super(x, y);
        this.sprite = 'images/enemy-bug.png';
        this.speedX = speedX;
        this.speedY = speedY;
        allEnemies.push(this);
    }
}

class Player extends Characters {
    constructor(x = 205, y = 400) {
        super(x, y);
        this.sprite = 'images/char-horn-girl.png';
    };

    handleInput(allowedKeys) {
        switch(allowedKeys) {
            case "left": 
                this.x -= 100;
                break;
            case "up":
                this.y -= 84;
                break;
            case "right": 
                this.x += 100;
                break; 
            case "down": 
                this.y += 84;
                break;
        }
    }

    update() {
        if (this.x < 5) {
        this.x = 405;
        }
        else if (this.x > 405) {
            this.x = 5;
        }

       if (this.y < 0) {
           // reset();
           this.y = 400;
        }
        else if (this.y > 400) {
            this.y = 400;
        }
    }
}


// Enemies our player must avoid
/*var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};*/

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

const allEnemies = [];
const enemy1 = new Enemy(50, 63);
const enemy2 = new Enemy(50, 147);
const enemy3 = new Enemy(50, 230);


// Place the player object in a variable called player
const player = new Player(205, 400); 



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
