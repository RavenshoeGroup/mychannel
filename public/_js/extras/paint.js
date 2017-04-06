var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'play',{ preload: preload, create: create, update: update },true);
var surprise
var brush
var bmd
var stick1
var pad
var socket
var clients
var dpr = window.devicePixelRatio;
if(dpr == 1){
  dpr = 1.5
}
var scaleRatio = dpr / 3
var cursor

function preload() {

    game.load.atlas('arcade', '_js/extras/assets/arcade-joystick.png', '_js/extras/assets/arcade-joystick.json');
    game.load.spritesheet('surprise', '_js/extras/assets/surprise.jpg', 1000, 1000);
    game.load.spritesheet('brush', '_js/extras/assets/brush.png', 64, 64);
}


function create() {

  socket = io.connect()
  setEventHandlers();   
	
  game.world.setBounds(0, 0, window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);

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

  surprise = game.make.sprite(0, 0, 'surprise');
  brush = game.make.sprite(0, 0, 'brush');
  bmd = game.make.bitmapData(surprise.width, surprise.height);
  game.add.sprite(0,0,bmd)

  game.input.addMoveCallback(paint, this);

  clients = []

}


function update() {
   

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
  // socket.on('move player', onMovePlayer)  

  // Player removed message received
  socket.on('remove player', onRemovePlayer)

  // New BMD message received
  socket.on('new bmd', onNewBMD)

}


//Socket connected
function onSocketConnected () {
  console.log('Connected to socket server')  
}


function onLobbyJoined () {
  console.log('Lobby Joined')

  // Reset clients on reconnect
  clients = []

  // Send local player data to the game server
  socket.emit('new player')
}


//Socket disconnected
function onSocketDisconnect () {
  console.log('Disconnected from socket server')
}


// New player
function onNewPlayer (data) {
  console.log('New player connected: ', data.id)

  //AVOID DUPLICATE PLAYERS AS WELL AS LOCAL PLAYER
  // var duplicate = playerById(data.id)
  // if (duplicate) {
  //   console.log('Duplicate player!')
  //   return
  // }   
}


// Remove player
function onRemovePlayer (data) {
  // var removePlayer = playerById(data.id)

  // // Player not found
  // if (!removePlayer) {
  //   console.log('Player not found: ', data.id)
  //   return
  // }

  // removePlayer.player.kill()
}


// New BMD
function onNewBMD (data) {
  if(/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
    //DO NOTHING
  }else{
    if(data == null){
      //Do Nothing
    }else{      
      brush.x = data.x
      brush.y = data.y
      bmd.alphaMask(surprise, brush);     
    }
  }  
}


// Find player by ID
function playerById (id) {
  for (var i = 0; i < clients.length; i++) {
    if (clients[i].player.name === id) {
      return clients[i]
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
      // brush.x = x
      // brush.y = y
      // bmd.alphaMask(surprise, brush);    
    }
}


function sendBMDToServer(x,y){
  // setTimeout(function(){ socket.emit('new bmd', { x: x, y: y }); }, 100);  
  socket.emit('new bmd', { x: x, y: y });
}


