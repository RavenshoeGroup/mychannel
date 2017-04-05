var loadState = {

	preload: function(){

		//var loadingLabel = game.add.text(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio,'loading...',{font:'30px Arial',fill:'#ffffff'});
		game.load.atlas('arcade', '_js/extras/assets/arcade-joystick.png', '_js/extras/assets/arcade-joystick.json');
		game.load.spritesheet('player', '_js/extras/assets/ball.png', 10, 10);
		game.load.spritesheet('empty', '_js/extras/assets/1x1.png', 1, 1);
		game.load.spritesheet('surprise', '_js/extras/assets/surprise.jpg', 1000, 1000);
		game.load.spritesheet('brush', '_js/extras/assets/brush.png', 64, 64);

	},

	create: function(){
		game.state.start('menu');
	}

};