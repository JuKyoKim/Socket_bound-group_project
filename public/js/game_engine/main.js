var board_height = 500;
var board_width = 800;

var game = new Phaser.Game(board_width, board_height, Phaser.CANVAS, 'game-container');

var TankGame = function(game){

	//variables im going to use throughout the game
	this.turn = 1;

	this.playerTank = null;
	this.playerTurret = null;
	this.playerhp = 100;
	this.playerhptext = null;
	this.playerPower = 0;
	this.playerText = null;
	this.playerCursor = null;
	this.playerFirebutton = null;
	this.playerAngleText = null;

	this.enemyTank = null;
	this.enemyTurret = null;
	this.enemyhp = 100;
	this.enemyhptext = null;
	this.enemyPower = 0;
	this.enemyText = null;
	this.enemyCursor = null;
	this.enemyFirebutton = null;
	this.enemyAngleText = null;

	this.bullet = null;
	// this.background = null;

};

TankGame.prototype = {
	preload:function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 400;
		this.load.image('background1', '../../assets/background9.jpg');
        this.load.image('background2', '../../assets/background6.jpg');
        this.load.image('background3', '../../assets/background7.jpg');
				this.load.image('background4', '../../assets/background8.jpg');

		this.load.image('player1', '../../assets/player1.png');
		this.load.image('player2', '../../assets/tank.png');
		this.load.image('turret', '../../assets/turret.png');
		this.load.image('bullet', '../../assets/bullet.png');


	},

	create:function(){
		//sets the background to any of the three
		var rand = Math.floor((Math.random()*4)+1);
		// rand >= 1 ? rand = 1: rand = 2;
		this.background = this.add.sprite(0, 0, 'background'+rand);

		/* sets everything for the player 1 and 2 */

		//the main body
		this.playerTank = this.add.sprite(0+Math.round(Math.random()*100), board_height-50, 'player1');
		//turret
		this.playerTurret = this.add.sprite(this.playerTank.x + 25, this.playerTank.y + 14, 'turret');
        // default power set to 300 will most likely remove this part
        this.playerPower = 300;
        // text for the power
        this.playerText = this.add.text(10, 8, 'Power: 300', { font: "18px Arial", fill: "#ffffff" });
        //hp text
        this.playerhptext = this.add.text(10, 28, 'player1: 100', { font: "18px Arial", fill: "#ffffff" });
        //angletext
        this.playerAngleText = this.add.text(10, 48, 'angle: 0', { font: "18px Arial", fill: "#ffffff" });
        //controls preset for turns
        this.playerCursor = this.input.keyboard.createCursorKeys();
		this.playerFirebutton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.playerFirebutton.onDown.add(this.fire, this);

        //the main body
		this.enemyTank = this.add.sprite(board_width-(50+Math.round(Math.random()*100)), board_height-70, 'player2');
		//turret
		this.enemyTurret = this.add.sprite(this.enemyTank.x + 35, this.enemyTank.y + 34, 'turret');
		//becuase the angling doesnt work for player 2 im going to just anchor a point on my turret 2
		this.enemyTurret.anchor.setTo(0,0);
		// default power set to 300 will most likely remove this part
		this.enemyPower = 300;
		// text for the power
		this.enemyText = this.add.text(board_width - 158, 8, 'Power: 300', { font: "18px Arial", fill: "#ffffff" });
		//hp text
		this.enemyhptext = this.add.text(board_width - 158, 28, 'player2: 100', { font: "18px Arial", fill: "#ffffff" });
		//angle text
		this.enemyAngleText = this.add.text(board_width - 158, 48, 'angle: 0', { font: "18px Arial", fill: "#ffffff" });
		//controls preset for turns
		this.enemyCursor = this.input.keyboard.createCursorKeys();
		this.enemyFirebutton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.enemyFirebutton.onDown.add(this.fire, this);

		//sets up the bullet
		this.bullet = this.add.sprite(0, 0, 'bullet');
        this.bullet.exists = false;
        this.physics.arcade.enable(this.bullet);

	},

	update:function(){

		this.actionPerTurn();

		if (this.bullet.exists){

			//if the bullet overlaps a player remove the bullet
			this.hit();

			//check to see if it hit land
			this.LandHo();


        }
	},

	fire:function(){
		//check to see if bullet exist, if not log me firing and move forward
		if(this.bullet.exists){
			return;
		}


		if(this.turn % 2 === 0){

			//reset the bullet back to the turret
			this.bullet.reset(this.playerTurret.x, this.playerTurret.y);

			//find the turrets ending by setting a point and finding rotation
			var p1 = new Phaser.Point(this.playerTurret.x, this.playerTurret.y);
			p1.rotate(p1.x, p1.y, this.playerTurret.rotation, false, 34);

			//according to the doc I send rotation and power, and it wil; return a velocity i set to the third (which is bullet)
			this.physics.arcade.velocityFromRotation(this.playerTurret.rotation, this.playerPower, this.bullet.body.velocity);

			this.turn += 1;
		}else{

			//reset the bullet back to the turret.
			this.bullet.reset(this.enemyTurret.x, this.enemyTurret.y);

			//find the turrets ending
			var p1 = new Phaser.Point(this.enemyTurret.x, this.enemyTurret.y);
			p1.rotate(p1.x, p1.y, this.enemyTurret.rotation, false, 34);

			//according to the doc I send rotation and power, and it wil; return a velocity i set to the third (which is bullet)
			this.physics.arcade.velocityFromRotation(this.enemyTurret.rotation, this.enemyPower, this.bullet.body.velocity);

			this.turn += 1;
		}
	},

	LandHo: function () {
		//check if bullet hits any of the border areas
		if(this.bullet.x < 0 || this.bullet.x > board_width || this.bullet.y > board_height){
        	//remove that bullet
        	this.bullet.kill();
        	return;
    	}
    },

	//bullet vs player
	hit:function(){
		if(this.turn % 2 === 0){

			if(this.bullet.x <= this.playerTank.x && this.bullet.y <= this.playerTank.y){
				this.bullet.kill();
				this.playerhp -= 20;
				this.playerhptext.text = 'player1: '+ this.playerhp;
				if(this.playerhp === 0){
					this.playerTurret.kill();
					this.playerTank.kill();
				}
				return;
			}
		}else{
			if(this.bullet.x >= this.enemyTank.x && this.bullet.y >= this.enemyTank.y){
				this.bullet.kill();
				this.enemyhp -= 20;
				this.enemyhptext.text = 'player1: '+ this.enemyhp;
				if(this.enemyhp === 0){
					this.enemyTurret.kill();
					this.enemyTank.kill();
				}
				return;
			}
		}
	},
	actionPerTurn:function(){
		if(this.turn % 2 === 0){
			//power adding or subtracting
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
			this.playerAngleText.text = 'angle: ' + this.playerTurret.angle;
	    	this.playerText.text = 'power: ' + this.playerPower;
		}else{
			//power adding or subtracting
			if (this.enemyCursor.left.isDown && this.enemyPower > 100){
			    this.enemyPower -= 2;
			}else if (this.enemyCursor.right.isDown && this.enemyPower < 600){
			    this.enemyPower += 2;
			}
			//because i cant get the turret to pivot at a different point i cant set angle limitations
			if (this.enemyCursor.up.isDown){
			    this.enemyTurret.angle ++;
			}else if (this.enemyCursor.down.isDown){
			    this.enemyTurret.angle--;
			}

			//  Update the text
			this.enemyAngleText.text = 'angle: ' + this.enemyTurret.angle;
	    	this.enemyText.text = 'power: ' + this.enemyPower;

		}
	}






};

game.state.add('Game', TankGame, true);
