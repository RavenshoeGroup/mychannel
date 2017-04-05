var menuState = {

	create: function(){
		socket = io.connect()
		// Our tiled scrolling background
	    // space = game.add.tileSprite(0, 0, 4000, 4000, 'space');
	    setEventHandlers();   
	},

	update: function(){
		if(playerCount == 2){
	 		game.state.start('play');
		}
	}

};