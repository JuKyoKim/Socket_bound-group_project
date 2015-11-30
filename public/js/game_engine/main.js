var board_height = 500;
var board_width = 800;
var game = new Phaser.Game(board_width, board_height, Phaser.CANVAS, 'game_screen');


var TankGame = function(game){
	//variables im going to use throughout the game
	this.turn = 1;
	this.bullet = null;
	this.background = null;
	this.fireButton = null;

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
};

TankGame.prototype = {
	preload:function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 400;

		this.load.image('background1', '../../assets/background1.jpg');
        this.load.image('background2', '../../assets/background2.jpg');
        this.load.image('background3', '../../assets/background3.jpg');
		this.load.image('background4', '../../assets/background4.jpg');
        this.load.image('button', '../../assets/button.png');

		this.load.image('player1', '../../assets/tank2.png');
		this.load.image('player2', '../../assets/tank.png');
		this.load.image('turret', '../../assets/turret.png');
		this.load.image('bullet', '../../assets/bullet.png');


	},

	create:function(){
		//sets the background to any of the three
		var rand = Math.floor((Math.random()*4)+1);
		// rand >= 1 ? rand = 1: rand = 2;
		this.background = this.add.sprite(0, 0, 'background'+rand);

		//fire button universal
		this.fireButton = this.add.button((board_width/2)-75, board_height-50, 'button', this.fire, this);
		console.log(this.fireButton);
		/* sets everything for the player 1 and 2 */
		//the main body
		this.playerTank = this.add.sprite(0+Math.round(Math.random()*100), board_height-70, 'player1');
		//turret
		this.playerTurret = this.add.sprite(this.playerTank.x + 25, this.playerTank.y + 14, 'turret');

        // text for the power
        this.playerText = this.add.text(10, 8, 'Power of shot: ', { font: "18px Arial", fill: "#ffffff" });
        //hp text
        this.playerhptext = this.add.text(10, 28, 'player1hp: 100', { font: "18px Arial", fill: "#ffffff" });
        //angletext
        this.playerAngleText = this.add.text(10, 48, 'angle: 0', { font: "18px Arial", fill: "#ffffff" });
        //controls preset for turns
        this.playerCursor = this.input.keyboard.createCursorKeys();

        //the main body
		this.enemyTank = this.add.sprite(board_width-(50+Math.round(Math.random()*100)), board_height-70, 'player2');
		//turret
		this.enemyTurret = this.add.sprite(this.enemyTank.x + 35, this.enemyTank.y + 34, 'turret');
		//becuase the angling doesnt work for player 2 im going to just anchor a point on my turret 2
		this.enemyTurret.anchor.setTo(0,0);
		// text for the power
		this.enemyText = this.add.text(board_width - 158, 8, 'Power of shot: ', { font: "18px Arial", fill: "#ffffff" });
		//hp text
		this.enemyhptext = this.add.text(board_width - 158, 28, 'player2hp: 100', { font: "18px Arial", fill: "#ffffff" });
		//angle text
		this.enemyAngleText = this.add.text(board_width - 158, 48, 'angle: 0', { font: "18px Arial", fill: "#ffffff" });
		//controls preset for turns
		this.enemyCursor = this.input.keyboard.createCursorKeys();

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

		var searchVal = $("#search_value").val();
		var that = this;
		if(searchVal.trim() === ''){ //check for empty field or spaces
			console.log("not defined");
			return;
		}else{
			if(this.turn % 2 === 0){

				$.ajax({
					url: "http://localhost:3000/mention/"+searchVal,
					method: "GET",
					dataType: "json"
				}).done(function(data){
					console.log(data);
					//reset the bullet back to the turret
					that.bullet.reset(that.playerTurret.x, that.playerTurret.y);

					//find the turrets ending by setting a point and finding rotation
					var p1 = new Phaser.Point(that.playerTurret.x, that.playerTurret.y);
					p1.rotate(p1.x, p1.y, that.playerTurret.rotation, false, 34);

					//according to the doc I send rotation and power, and it wil; return a velocity i set to the third (which is bullet)
					that.physics.arcade.velocityFromRotation(that.playerTurret.rotation, data.tweetsPerSec, that.bullet.body.velocity);

					that.turn += 1;

					//  Update the text
					that.playerAngleText.text = 'angle: ' + that.playerTurret.angle;
	    			that.playerText.text = 'power: ' + data.tweetsPerSec;
				});

			}else{

				$.ajax({
					url: "http://localhost:3000/mention/"+searchVal,
					method: "GET",
					dataType: "json"
				}).done(function(data){
					console.log(data);
					//reset the bullet back to the turret
					that.bullet.reset(that.enemyTurret.x, that.enemyTurret.y);

					//find the turrets ending by setting a point and finding rotation
					var p1 = new Phaser.Point(that.enemyTurret.x, that.enemyTurret.y);
					p1.rotate(p1.x, p1.y, that.enemyTurret.rotation, false, 34);

					//according to the doc I send rotation and power, and it wil; return a velocity i set to the third (which is bullet)
					that.physics.arcade.velocityFromRotation(that.enemyTurret.rotation, data.tweetsPerSec, that.bullet.body.velocity);

					that.turn += 1;
					//  Update the text
					that.enemyAngleText.text = 'angle: ' + that.playerTurret.angle;
	    			that.enemyText.text = 'power: ' + data.tweetsPerSec;
				});
			}//end of the actual firing mech

		}// end of the else statement

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
				playerhp = this.playerhp;

				socket.emit('send HP', playerhp);

				socket.on('send HP', function(playerhp){
					$('#playerhp').append('<p class="playerhp-text">').text("HP: " + playerhp);
				});

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

			//  Allow them to set the angle, between -90 (straight up) and 0 (facing to the right)
			if (this.playerCursor.up.isDown && this.playerTurret.angle > -90){
			    this.playerTurret.angle--;
			}else if (this.playerCursor.down.isDown && this.playerTurret.angle < 0){
			    this.playerTurret.angle++;
			}

		}else{

			//because i cant get the turret to pivot at a different point i cant set angle limitations
			if (this.enemyCursor.up.isDown){
			    this.enemyTurret.angle ++;
			}else if (this.enemyCursor.down.isDown){
			    this.enemyTurret.angle--;
			}

		}
	}

};

game.state.add('Game', TankGame, true);
