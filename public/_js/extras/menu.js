var menuState = {

	create: function(){

		// Our tiled scrolling background
	    // space = game.add.tileSprite(0, 0, 4000, 4000, 'space');
	},

	update: function(){
		if(game.input.activePointer.justPressed()) {
	 		game.state.start('play');
	 	}
	}

};