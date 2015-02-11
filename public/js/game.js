var game = new Phaser.Game(1400, 900, Phaser.AUTO, 'game-mainpage', { preload: preload, create: create, update: update, render: render });

// Initializing game =======================================================================

function preload() {



  game.load.image('farmer', 'image/farmer.png');
  game.load.image('flyer', 'image/zombiepig.jpg');

}

var character;
var ball;
var cursors;
var timer;
var score;
var tod;

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);
  
  createPlayer();
  createBall();

  cursors = game.input.keyboard.createCursorKeys();

  timer = game.time.create(true);
  timer.start()

}

function update() {

    game.physics.arcade.collide(character, ball, destroySprite);

    if (cursors.left.isDown) { character.body.velocity.x -= 8; }
    else if (cursors.right.isDown) { character.body.velocity.x += 8; } 
    if (cursors.up.isDown) { character.body.velocity.y -= 8; }
    else if (cursors.down.isDown) { character.body.velocity.y += 8; }

    ball.rotation += ball.body.velocity.x/10000;

}

function render() {

    game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);

}

// Game methods ============================================================================

function createPlayer() {

  character = game.add.sprite(game.rnd.integerInRange(100, 770), game.rnd.integerInRange(0, 570), 'farmer');
  character.scale.setTo(0.25, 0.25);
  character.anchor.setTo(0.5, 0.5);
  game.physics.enable(character, Phaser.Physics.ARCADE);
  character.body.collideWorldBounds = true;
  character.body.bounce.set(0.3);

}

function createBall() {


  ball = game.add.sprite(game.rnd.integerInRange(100, 770), game.rnd.integerInRange(0, 570), 'flyer');

  ball.scale.setTo(0.02, 0.02);
  ball.anchor.setTo(0.5, 0.5);
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1.1);
  ball.body.velocity.setTo(400,400);

  cursors = game.input.keyboard.createCursorKeys();
}

function destroySprite() {

  character.kill();
  score = timer;
  // console.log(score);
  // console.log(score._now);
  // console.log(score._started);
  // console.log((score._now - score._started)/1000);
  tod = ((score._now - score._started)/1000);
}