$(document).ready(function(){
	console.log("game is loaded WHOO!");
	game;
});



var game = new Phaser.Game(700, 500, Phaser.AUTO, 'game_container', { preload: preload, create: create, update: update, render: render });
var floor;
var player;
var player1;
var player2;

function preload() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.load.image('background','../../assets/background.png');
	game.load.image('floor','../../assets/placeholdfloor.png');
	game.load.image('player1','../../assets/player1.png');
	game.load.image('player2','../../assets/player2.png');
}

function create() {
	//background image
	game.add.sprite(0, 0, 'background');
	
	//grouping that joint, in case i need to display multiple
	floor = game.add.group();
	//enables physics for the floor
	floor.enableBody = true;
	//creates the ground
	var ground = floor.create(0, game.world.height - 100, 'floor');
	
	//scales it to fit the page
	ground.scale.setTo(4, 1);
	
	//makes the ground static
	ground.body.immovable = true;
	
	//new player group(mainly to attach properties)
	player = game.add.group();
	
	//player 1 and 2
	player1 = player.create(0, game.world.height - 300, 'player1');
	player2 = player.create(100, game.world.height - 300, 'player2');
	
	//enabling arcade physics for the player
	game.physics.arcade.enable(player);
	
	//using the hlper function to set the properties
	setPlayerProperties(player1);
	setPlayerProperties(player2);



}

function update() {
	//collision detection agaisnt the floor and the players
	game.physics.arcade.collide(floor, player);
	
	//creates keyboard keys
	directKeys = game.input.keyboard.createCursorKeys();
	setkeys(player1);
	setkeys(player2);


}

function render() {

}

//helper functions for the game
//helper functions for the game

var setPlayerProperties = function(player){
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 300;
	player.body.collideWorldBounds = true;
}

var setkeys = function(player){
	player.body.velocity.x = 0;

	if(directKeys.left.isDown){
		//go left
		player.body.velocity.x = -150;
	}else if(directKeys.right.isDown){
		//go right
		player.body.velocity.x = 150;
	}
}


