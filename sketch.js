// the global variable declaration
// canvas and the background image variable
var canvas, backgroundImage;

// gameState and finished players variable
var gameState = 0, finishedPlayers;
// plaeyer count, all players , distance, database
var playerCount;
var allPlayers;
var distance = 0;
var database;

// form, player and game variable
var form, player, game;

// background variables
var formBackground;
var gameBackground;
var gameBackground2;

// var position, playerPosition;

// the ship players - - total 4 player
var ship1, ship2, ship3, ship4;
// the ships variable
var ships;

// the obstacles variable and the obstacle image variable
var obstacles, obstaclesImage;

// the bullet and the bullet image variable
var bullet, bulletImage;
var bulletBut, bulletsGroup;

// the score variable
var score = 0;

// making the rocks destroy counter variable
var rocksDestroyed = 0;

// the preload function
function preload(){
  // background of form -- scenery
  formBackground = loadImage("images/loginbackgr.jpg");
  // game background image -- scenery
  gameBackground = loadImage("images/outers.jpg");
  // game background image -- solid colour
  gameBackground2 = loadImage("images/Solid_background.jpg");


  // ship images
  ship1img = loadImage("images/shipBlue.png");
  ship2img = loadImage("images/shipBrown.png");
  ship3img = loadImage("images/shipRed.png");
  ship4img = loadImage("images/shipYellow.png");

  // obstacles image
  obstaclesImage = loadImage("images/obstacle.png");

  // bullet image
  bulletImage = loadImage("images/Untitledy.png");
}

// the setup function
function setup(){
  canvas = createCanvas(displayWidth , displayHeight);
  database = firebase.database();
  gameState = 0;
  distance = 0;
 // finishedPlayers = 0;
  yVel = 0;
  xVel = 0;

  // creating the obstacles group
  obstaclesGroup = createGroup();
  // creating the bulletsGroup
  bulletsGroup = createGroup();

  xSet = false;
  game = new Game();
  game.getState();
  game.start();
  // playerPosition = database.ref("Player1/position");
  // playerPosition.on("value", readPosition);


    // creating the bullet button
          bulletBut = createButton("Spawn Bullets");/*displayWidth-50, displayHeight-50, 10, 10*/
          //bulletBut.addImage("bulletImage", bulletImage);
          bulletBut.position(displayWidth-100, displayHeight-50);
          bulletBut.mousePressed(Game.spawnBullets);

          // if(mousePressed(bulletBut) || keyIsDown(32)){
            // spawnBullets();
          // }
}

// the draw funciton 
function draw(){
   //start the game
   background(formBackground);

   spawnObstacles();
   //start the game
   if (playerCount === 4 ) {
     game.update(1);
     //fill('yellow');
     //textSize(35);
     //text("all players joined", displayWidth/2 - 225, displayHeight/2 - 100);
     background(gameBackground2);
   }
   else
   {
     fill('yellow');
     textSize(35);
     text("Waiting for others players" , displayWidth/2 - 200, displayHeight/2 - 200);
     text("no of players:- " + playerCount, displayWidth/2 - 50, displayHeight/2 - 100);
   }
 
   //start the game for real
   if (gameState === 1) {
     game.play();
   }
  //  displaying end when the gameState is 2
   if (gameState === 2) {
     console.log("End");
   }
 
   bulletBut.mousePressed()
  //  making the rocks destry if the bullets touch the rocks and disappearing the bullets after they destroy the rocks.
  if(bulletsGroup.isTouching(obstaclesGroup)){
    obstaclesGroup.destroyEach();
    rocksDestroyed+=1;
    score+=1;
    bulletsGroup.destroyEach();
    spawnObstacles();
  }
  }
   
  // the read position function
// function readPosition(data){
  // reading the database position
  // changing the ballx  and ball y position to the database position
  // position = data.val();
  // player.x = Player1.position.x;
  //player.y = Player1.position.y;
// }



// the spawn obstacles function
function spawnObstacles(){
// creating the obstacles
    // giving a random widtha and height to the obstacles
    w = random(200,950);
    h = random(-height*4,height - 300);
    // creating the obstacles sprite
    obstacles = createSprite(displayWidth, random((displayHeight-displayHeight), (displayHeight-75)),w,h);
    // adding image to the obstacles sprite
    obstacles.addImage("obstacle-image", obstaclesImage);
    obstacles.velocityX = -6;
    obstacles.scale = 0.1;
    // adding the created obstacles to the obstaclesGroup
    obstaclesGroup.add(obstacles);
}

