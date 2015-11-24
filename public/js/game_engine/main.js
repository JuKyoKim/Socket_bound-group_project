$(document).ready(function(){
	console.log("game is loaded WHOO!");
	game;
});

var game = new Phaser.Game(700, 500, Phaser.AUTO, 'game_container', { preload: preload, create: create, update: update });

function preload(){
	//preloads the Physics in to the game
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//preloads all the backgrounds
	game.load.image('background1','../../assets/background1.png');
	game.load.image('background2','../../assets/background2.png');
	game.load.image('background3','../../assets/background3.png');
	game.load.image('background4','../../assets/background4.png');

	game.load.image('player1','../../assets/player1.png');
	game.load.image('player2','../../assets/player2.png');
}

function create(){
	var rand = Math.round(Math.random()*3)+1
	//the background will tile if the background is smaller than the preset size i set above
	game.add.tileSprite(0,0, game.world.width, game.world.height, 'background'+rand);

}

function update(){

}