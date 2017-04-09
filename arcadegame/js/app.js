
//UDACITY FRONTEND WEB DEVELOPER PROJECT 3 - ARCADE GAME- Jessica Gladstone

 /* Modified the engine.js file by adding star, princess, horn girl images to resources and render function.
  * Added text attributes to the canvas area of engine.js file. Automatic reset after 2.1 seconds.
  * Use of the Udacity discussion forum helped me understand how to format much of the coding.
  */

// Set Enemy class with image locations.
var Enemy = function (x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};

//Sets random speed for enemy bugs on canvas and off.
Enemy.prototype.update = function (dt) {
    if (this.x < 505) {
        this.x = this.x + (this.speed * dt);
    }
    else {
        this.x = -10;
        this.speed = Math.floor(Math.random()*(300 - 80)) + 110;
    }
};
// Draw bugs on canvas.
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Set Player class with image location.
//Updated the engine.js to use image.
var Player = function (x,y) {
    this.sprite = "images/char-horn-girl.png";
    this.x = 10;
    this.y = 400;
};
//Set Princess class with image location.Updated engine.js to use image.
var Princess = function (x,y) {
    this.sprite = "images/char-princess-girl.png";
    this.x = 900;
    this.y = 900;
};
//Draw player on canvas.
Player.prototype.render = function (){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*Check to see if collision conditions occur. Calculate distance between images.
 *Reset player to original coordinates when collision with bugs occurs. 
 *Move player and star offscreen and place princess when player reaches star.
 *Invoke function in engine.js file.
 */
Player.prototype.collision = function () {
    for(var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 50 &&
        this.x + 50 > allEnemies[i].x &&
        this.y < allEnemies[i].y + 50 &&
        this.y + 50 > allEnemies[i].y) {
            this.x = 10;
            this.y = 400;
        }
        if (this.x > star.x &&
        this.y < star.y) {
            star.x = 700;
            star.y = 700;
            this.x = 800;
            this.y = 800;
            princess.x = 400;
            princess.y = 5;
            setTimeout (function () {
            reset ();
           }, 2100);
        }
     }
};

//Update prototype for player.
Player.prototype.update = function () {
};
 
//Set Star class with image location.
var Star = function (x,y) {
    this.x = 400;
    this.y = 5;
    this.sprite = "images/star.png";
};
//Draw star on canvas.
Star.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
};

//Draw princess on canvas.
Princess.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
} ;
//Update prototype for princess.
Princess.prototype.update = function () {
};
//Function for keyboard input and setting the canvas boundaries.
Player.prototype.handleInput = function (key) {
    switch (key) {
        case "left": this.x = this.x - 100;
        break;
        case "right": this.x = this.x + 100;
        break;
        case "up": this.y = this.y - 84;
        break;
        case "down": this.y = this.y + 83;
    }
    if(this.x < 0) {
        this.x = 0;
    } 
    else if (this.y < 0) {
        this.y = 0;
    } 
    else if (this.x + 100 >= 505) {
        this.x = 505-100;
    } 
    else if (this.y + 200 >= 603) {
        this.y = 603 - 200;
    }
};
// Instantiate objects and set array for enemy bugs//
var player = new Player();
var star = new Star ();
var princess = new Princess ();
var allEnemies = [];
for (var i = 0; i < 3; i++){
    allEnemies.push(new Enemy(-40, 60 + (83*i)));
};   
//Reset positions for new game after setTimeout on collision.This game should be modified at future time to add another level.//
var reset = function () {
        player.x = 10;
        player.y = 400;
        star.x = 400;
        star.y = 5;
        princess.x = 900;
        princess.y = 900;
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.//
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
