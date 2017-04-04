var loadState = {

	preload: function(){

		//var loadingLabel = game.add.text(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio,'loading...',{font:'30px Arial',fill:'#ffffff'});
		game.load.atlas('arcade', '_js/extras/assets/arcade-joystick.png', '_js/extras/assets/arcade-joystick.json');
		game.load.spritesheet('player', '_js/extras/assets/ball.png', 10, 10);

	},

	create: function(){
		game.state.start('menu');
	}

};