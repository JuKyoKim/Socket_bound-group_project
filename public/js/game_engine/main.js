var board_height = 600;
var board_width = 800;

var game = new Phaser.Game(board_width, board_height, Phaser.CANVAS, 'game_container');

var TankGame = function(game){
	this.playerTank = null
	this.playerTurret = null

	this.enemyTank = null
	this.enemyTurret = null

	this.bullet = null
	this.background = null
	
	this.playerPower = 0
	this.playerText = null

	this.enemyPower = 0
	this.enemyText = null

	this.playerCursor = null
	this.playerFirebutton = null
};

TankGame.prototype = {
	preload:function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 400;
		this.load.image('background1', '../../assets/background1.png');
        this.load.image('background2', '../../assets/background2.png');
        this.load.image('background3', '../../assets/background3.png');

		this.load.image('player1', '../../assets/player1.png');
		this.load.image('player2', '../../assets/player2.png');
		this.load.image('turret', '../../assets/turret.png');
		this.load.image('bullet', '../../assets/bullet.png');
		
		
	},

	create:function(){
		//sets the background to any of the three
		var rand = Math.round(Math.random()*3);
		rand >= 1 ? rand = 1: rand = 2;
		this.background = this.add.sprite(0, 0, 'background'+rand);

		//sets up both tanks and turrets
		this.playerTank = this.add.sprite(0+Math.round(Math.random()*100), board_height-50, 'player1');
		this.playerTurret = this.add.sprite(this.playerTank.x + 25, this.playerTank.y + 14, 'turret');

		//this.enemyTank = this.add.sprite(board_width-(50+Math.round(Math.random()*100)), board_height-50, 'player2');
		//this.enemyTurret = this.add.sprite(this.enemyTank.x - 25, this.enemyTank.y + 14, 'turret');

		//sets up the bullet
		this.bullet = this.add.sprite(0, 0, 'bullet');
        this.bullet.exists = false;
        this.physics.arcade.enable(this.bullet);

        //sets up both power text on opposite sides of the game
        this.playerPower = 300;
        this.playerText = this.add.text(10, 8, 'playerPower: 300', { font: "18px Arial", fill: "#ffffff" });

        //this.enemyPower = 300;
		//this.enemyText = this.add.text(board_width - 158, 8, 'enemyPower: 300', { font: "18px Arial", fill: "#ffffff" });

		this.playerCursor = this.input.keyboard.createCursorKeys();
		this.playerFirebutton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.playerFirebutton.onDown.add(this.fire, this);

	},

	update:function(){
		//if the bullet exists check what it hit
		if (this.playerCursor.left.isDown && this.playerPower > 100){
		    this.playerPower -= 2;
		}else if (this.playerCursor.right.isDown && this.playerPower < 600){
		    this.playerPower += 2;
		}

		//  Allow them to set the angle, between -90 (straight up) and 0 (facing to the right)
		if (this.playerCursor.up.isDown && this.playerTurret.angle > -90){
		    this.playerTurret.angle--;
		}else if (this.playerCursor.down.isDown && this.playerTurret.angle < 0){
		    this.playerTurret.angle++;
		}

		//  Update the text
        this.playerText.text = 'playerPower: ' + this.playerPower;

		if (this.bullet.exists){
			//
			this.LandHo();
        }
	},

	fire:function(){
		//check to see if bullet exist, if not log me firing and move forward
		if(this.bullet.exists){
			return;
		}

		//reset the bullet back to the turret
		this.bullet.reset(this.playerTurret.x, this.playerTurret.y);

		//find the turrets ending
		var p = new Phaser.Point(this.playerTurret.x, this.playerTurret.y);
		p.rotate(p.x, p.y, this.playerTurret.rotation, false, 34);

		//according to the doc I send rotation and power, and it wil; return a velocity i set to the third (which is bullet)
		this.physics.arcade.velocityFromRotation(this.playerTurret.rotation, this.playerPower, this.bullet.body.velocity);

	},

	LandHo: function () {
		//check if bullet hits any of the border areas
		if (this.bullet.x < 0 || this.bullet.x > board_width || this.bullet.y > board_height){
        	//remove that bullet
        	this.bullet.kill();
        	return;
    	}
    },




};

game.state.add('Game', TankGame, true);










