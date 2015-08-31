// This app creates the elements for the Frogger game.
// The elements are displayed on a HTML5 Canvas generated via the engine.js.
// The resources are loaded from the resources.js file and used by the engine.
// 
////////////////////////////////////////////////////////ENEMY////////////////////////////////////////////////
// Enemies our player must avoid
var Enemy = function() {

    // Variables applied to each of our instances go here,
    'use strict';
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';

    this.x = this.startingPositionX(); //starting location x-axes
    this.y = this.startingPositionY();
    this.speed = this.speedRandom(); // speed of enemy

    this.imageWidth = 50;
    this.imageHeigth = 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, canvasWidth) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //speed of enemy
    this.x = this.x + this.speed * dt;

    if (this.x > 1010) { // Enemy returns to starting position
        this.x = this.startingPositionX();
        this.speed = this.speedRandom(); // Change speed enemy after reaching end

         this.y = this.startingPositionY();
       
    }

};

//set starting position of each enemy on the x-axes
// Create a random effect so that every enemy starts from a different pos.
Enemy.prototype.startingPositionX = function() {

    // Random number generated to start the enemies before the canvas
    var randomX = Math.floor(Math.random() * (0 + 50 + 1)) - 50;

    if (randomX > -25) { // don't let the bug come on the board.....
        randomX = -25;
    }
    return randomX;
};

//set starting position of each enemy on the y-axes
// Create a random effect so that every enemy starts from a different pos.
Enemy.prototype.startingPositionY = function() {


    //starting values on the y-axes
    var arrayYPosition = [60,140,220];
    var arrayYPositionLength = arrayYPosition.length;

    var rand = arrayYPosition[Math.floor(Math.random() * (arrayYPositionLength))];
    return rand;
   
};

Enemy.prototype.speedRandom = function() {

    //random number generated to change the speed
    var randomSpeedNumber = Math.floor(Math.random() * (400 - 100 + 1)) + 100;
    return randomSpeedNumber;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


////////////////////////////////////////////////////////Bridge////////////////////////////////////////////////
//Here the player must end to get the highest points.
var Bridge = function() {
    this.x = this.startingPositionX();
    this.y = 0;

    this.sprite = 'images/bridge.png';
};

Bridge.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Bridge.prototype.startingPositionX = function() {

    var arrayYPosition = [0,101,202,303,404,505,606,707,808,909];
    var arrayYPositionLength = arrayYPosition.length;

    this.rand = arrayYPosition[Math.floor(Math.random() * (arrayYPositionLength))];
    
    return this.rand; //use this rand in the player update function.
};

Bridge.prototype.update = function() {
      
      this.x = this.startingPositionX(); //change the position of the bridge

}

//create the bridge
var bridge =  new Bridge();

////////////////////////////////////////////////////////PLAYER////////////////////////////////////////////////
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

    this.sprite = 'images/char-boy.png';

    this.startingPositionY = 375;
    this.x = 0; //starting location x-axes
    this.y = this.startingPositionY; //starting location y-axes

    this.imageWidth = 90;
    this.imageHeigth = 90;
};

Player.prototype.update = function() {
    

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.y < 0) {

        //check if player reaches bridge
        if(this.x == bridge.rand ){
            console.log('Bridge reached');
            bridge.update();
        }else{
            this.y = 375; //move player back to orignal y position when it hits the water.     
        }
        //new x-axes starting point can be developed here. ////
    }

    if (this.x > 909 ) {
        this.x = 909;//player cannot get of canvas on the right side.
    }

    if (this.y > 400) {
        this.y = 400;
    }


};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyInput) {

    var key = keyInput;

    if (key == 'left') {
        this.x = this.x - 101;
        this.update();

    }

    if (key == 'up') {
        this.y = this.y - 80;
        this.update();

    }

    if (key == 'right') {
        this.x = this.x + 101;
        this.update();
    }

    if (key == 'down') {
        this.y = this.y + 80;
        this.update();
    }
    console.log(this.x );
};

////////////////////////////////////////////////////////EVENTS////////////////////////////////////////////////
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

// Now instantiate your objects.
var enemyRow1 = new Enemy();
var enemyRow2 = new Enemy();
var enemyRow3 = new Enemy();

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemyRow1, enemyRow2, enemyRow3];

// Place the player object in a variable called player
var player = new Player();

var hitStatus = false; // There is no collision in the beginning

var lengthEnemyArray = allEnemies.length; //length array

var checkCollisions = function() { //check for collisions between player and enemies

    for (var i = 0; i < lengthEnemyArray; i++) {

        //Enemy left side
        allEnemies[i].imageLeftSide = allEnemies[i].x;
        //Enemy right side
        allEnemies[i].imageRightSide= allEnemies[i].x + allEnemies[i].imageWidth ;
        //Enemy up side
        allEnemies[i].imageTopSide = allEnemies[i].y;
        // Enemy down side
        allEnemies[i].imageDownSide = allEnemies[i].y + allEnemies[i].imageHeigth;

        //player left side
        player.imageLeftSide = player.x;
        //player right side
        player.imageRightSide = player.x + player.imageWidth;
        //player top side
        player.imageTopSide = player.y;
        //player downside
        player.imageDownSide = player.y + player.imageHeigth;

        hitStatus = !(

            player.imageLeftSide > allEnemies[i].imageRightSide|| //check x-axes 
            player.imageRightSide < allEnemies[i].imageLeftSide ||

            player.imageTopSide > allEnemies[i].imageDownSide || //check y-axes
            player.imageDownSide < allEnemies[i].imageTopSide);

        if (hitStatus === true) {
            startOver();
        }

    }




};


//if there is a hit process player.update and then these functions:
var procesHit = function() {

    if (hitStatus === true) {
        setTimeout(startOver, 500); //take the hit like a boy
    }

};

var startOver = function() { //Put everybody back into starting positions.

    player.y = 375;
    player.x = 303;
};