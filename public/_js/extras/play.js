var playState = {

	create: function(){

		  // socket = io.connect()
      // setEventHandlers();   

      //-----------CREATE GAMEWORLD---------//
      //game.stage.backgroundColor = "#ffffff";

      // Resize our game world to be a 2000 x 2000 square
      game.world.setBounds(0, 0, window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);


      //-----------CREATE PARTICLE MANAGER---------// 
      // manager = this.game.plugins.add(Phaser.ParticleStorm);

      // var shipExplosion = {
      //   lifespan: { min: 500, max: 2000 },
      //   image: ['flare_diamond', 'flare_point', 'flare_vertical'],
      //   scale: { min: 0.2, max: 0.4 },
      //   rotation: { delta: 3 },
      //   velocity: { radial: { arcStart: -90, arcEnd: 90 }, initial: { min: 3, max: 6 }, control: [ { x: 0, y: 1 }, { x: 0.5, y: 0.5 }, { x: 1, y: 0 } ]  }
      // };

      // manager.addData('ship_explosion', shipExplosion);

      // explosionEmitter = manager.createEmitter();
      // explosionEmitter.addToWorld();


      //-----------CREATE WEAPONS ARRAY---------//
      // weapons = [];


      //-----------NEW LOCAL PLAYER---------//
      player = new LocalPlayer(game,playerCount);
      



      //-----------TEST OBSTACLES---------//
      



      //-----------TEST ITEM---------//
      



      //-----------BOSSES---------//
     


      //-----------ENEMIES ARRAY---------//
      enemies = []

      




      //-----------CAMERA CONTROLS---------//
      //  var edge = 100;
      // game.camera.deadzone = new Phaser.Rectangle(edge, edge, game.camera.width - (edge * 2), game.camera.height - (edge * 2));
      // game.camera.focusOn(player.player);

      // //if (this.game.device.desktop) {
      //   // Only autofollow if we're on desktop.
      //   game.camera.follow(player.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT)
      // //}



      //-----------JOYSTICK FOR MOBILE---------//
      if(/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
        pad = game.plugins.add(Phaser.VirtualJoystick);
        stick1 = pad.addStick(0, 0, 100, 'arcade');
        stick1.scale = 2;
        stick1.alignBottomLeft(100);
      }else{
        cursor = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
      }


      //-----------LOBBY JOINED---------//
      onLobbyJoined();


      
      //-----------INITIALISE MINIMAP---------//
      // minimap = new MiniMap(game);


      bmd = game.make.bitmapData(1000, 1000);
      bmd.draw('brush',-64,-64)
      bmd.alphaMask('surprise', bmd);
      game.add.sprite(0,0,bmd)

	},

	update: function(){

    //updateUnitDots(player,enemies);

    //-----------TEST OBSTACLE---------//



    //-----------ACTIVATE ITEM---------//    



    //-----------BOSS COLLISIONS---------//



    //-----------PLAYER COLLISIONS---------//
    // game.physics.arcade.collide(weapons[2], player.player, takeHeavyDamage, null, this);      


    //-----------ENEMY COLLISIONS---------//
    

      
    //-----------MINIMAP UPDATE---------//    
    // minimap.update(player,enemies,capitalG,capitalB)



    //-----------PLAYER UPDATE---------//
    player.update();




    //-----------ENEMY UPDATE---------//
    for(var i = 0; i < enemies.length; i++){
      if (enemies[i].alive) {
        enemies[i].update()                          
      }
    }  

    


    //-----------BOSS UPDATE---------//
    




    //-----------SCROLL BACKGROUND---------//
    //space.tilePosition.x = -game.camera.x
    //space.tilePosition.y = -game.camera.y

    //if (game.input.activePointer.isDown) {
    //  if (game.physics.arcade.distanceToPointer(player) >= 10) {
    //    currentSpeed = 300

    //    player.rotation = game.physics.arcade.angleToPointer(player)
    //  }
    //}



    //-----------FIRE WEAPONS---------//
    // if(/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
    //   if(stick2.isDown){
    //     //weapons[currentWeapon].fire(player.player);
    //     //player.fireLaser(enemies);
    //   }
    // }else{
    //   //Fire Laser
    //   if(game.input.activePointer.isDown){
    //     //weapons[currentWeapon].fire(player.player);
    //     //player.fireLaser(enemies);
    //   }
    // }


    //-----------PAINT---------//
    if(/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
      if(stick1.isDown){
        game.input.addMoveCallback(paint, this);
      }
    }else{
      if(game.input.activePointer.isDown){
        game.input.addMoveCallback(paint, this);
      }
    }



	},

  shutdown: function() {  
    player.player.destroy();
    for(var i = 0; i < enemies.length; i++){
      if (enemies[i].alive) {
        enemies[i].player.kill();    
        enemies[i].player.destroy();                             
      }
    }
  }

}



//-----------EVENT HANDLERS---------//
var setEventHandlers = function () {
  // Socket connection successful
  socket.on('connect', onSocketConnected)

  // Socket disconnection
  socket.on('disconnect', onSocketDisconnect)

  // New player message received
  socket.on('new player', onNewPlayer)

  // New player message received
  socket.on('lobby joined', onLobbyJoined)

  // Player move message received
  socket.on('move player', onMovePlayer)  

  // Player removed message received
  socket.on('remove player', onRemovePlayer)

  // New BMD message received
  socket.on('new bmd', onNewBMD)
  
  socket.on('player count', function(data) {
      playerCount = data.num_of_players;
  });

}


//Socket connected
function onSocketConnected () {
  console.log('Connected to socket server')  
}


function onLobbyJoined () {
  console.log('Lobby Joined')

  // Reset enemies on reconnect
  enemies.forEach(function (enemy) {
    enemy.player.kill()
  })
  enemies = []

  // Send local player data to the game server
  // console.log(player.player.x + ' ' + player.player.y + ' ' + player.player.angle + ' ' + username)
  socket.emit('new player', { x: player.player.x, y: player.player.y, angle: player.player.angle, username: username })
}


//Socket disconnected
function onSocketDisconnect () {
  console.log('Disconnected from socket server')
}


// New player
function onNewPlayer (data) {
  console.log('New player connected: ', data.id)
  //console.log('Total Players: ', data.num_of_players)
  //console.log('New player uses: ', data.ver)

  //AVOID DUPLICATE PLAYERS AS WELL AS LOCAL PLAYER
  var duplicate = playerById(data.id)
  if (duplicate) {
    console.log('Duplicate player!')
    return
  }

  //ADD EXISTING PLAYERS TO ENEMIES ARRAY
  enemies.push(new RemotePlayer(data.id, game, data.x, data.y, data.angle, data.username))
   
}

// Move player
function onMovePlayer (data) {
  var movePlayer = playerById(data.id)

  // Player not found
  if (!movePlayer) {
    console.log('Player not found: ', data.id)
    return
  }

  //console.log('player moved')
  // Update player position
  movePlayer.player.x = data.x
  movePlayer.player.y = data.y
  movePlayer.player.angle = data.angle
}


// Remove player
function onRemovePlayer (data) {
  var removePlayer = playerById(data.id)
  console.log('Total Players: ', data.num_of_players)

  // Player not found
  if (!removePlayer) {
    console.log('Player not found: ', data.id)
    return
  }

  removePlayer.player.kill()

  // Remove player from array
  enemies.splice(enemies.indexOf(removePlayer), 1)
}



// New BMD
function onNewBMD (data) {
  if(/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
    //DO NOTHING
  }else{
    if(data == null){
      //Do Nothing
    }else{      
      setTimeout(function(){ 
        bmd.draw('brush', data.x - 16, data.y - 16);
        bmd.alphaMask('surprise', bmd); 
      }, 100);        
    }
  }  
}


// Find player by ID
function playerById (id) {
  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].player.name === id) {
      return enemies[i]
    }
  }

  return false
}


function isEven(n) {
   return n % 2 == 0;
}



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function paint(pointer, x, y) {
    if (pointer.isDown){
      sendBMDToServer(x,y);
      // bmd.draw('brush', x - 16, y - 16);
      // bmd.alphaMask('surprise', bmd);        
    }
}


function sendBMDToServer(x,y){
  //setTimeout(function(){ socket.emit('new bmd', { x: x, y: y }); }, 100);  
 socket.emit('new bmd', { x: x, y: y });  
}


