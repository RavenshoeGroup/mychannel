/* global game */

var RemotePlayer = function (index, game, startX, startY, startAngle, startUsername) { 
  var x = startX
  var y = startY
  var angle = startAngle
  var username = startUsername

  this.game = game
  this.alive = true

  if(/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
    this.player = this.game.add.sprite(0, 0, 'empty')   
  }else{
    this.player = this.game.add.sprite(250, 250, 'player') 
  }   


  // this.player.scale.setTo(0.5, 0.5);
  this.player.scale.setTo(scaleRatio, scaleRatio);
  //this.player.anchor.setTo(0.5, 0.5)
  this.player.animations.add('move', [0], 0, true)
  this.player.animations.add('stop', [0], 0, true)
  this.player.frame = 0;
  
  game.physics.enable(this.player, Phaser.Physics.ARCADE);
  this.player.enableBody = true; 
  this.player.name = index.toString()
  this.player.body.maxVelocity.setTo(400, 400)
  this.player.body.immovable = true
  this.player.body.collideWorldBounds = true

  this.player.angle = angle

  this.lastPosition = { x: x, y: y, angle: angle }
  
}

RemotePlayer.prototype.update = function () {
  if (this.player.x !== this.lastPosition.x || this.player.y !== this.lastPosition.y || this.player.angle != this.lastPosition.angle) {
    //this.player.play('move')

    //ADDED BELOW TO SMOOTH MOVEMENT
    game.add.tween(this.player).to( { x: this.player.x, y: this.player.y }, this.game.time.physicsElapsed, Phaser.Easing.Default, true);
    this.player.rotation = Math.PI + game.physics.arcade.angleToXY(this.player, this.lastPosition.x, this.lastPosition.y)   
  } else {
    //this.player.play('stop')
  }

  this.lastPosition.x = this.player.x
  this.lastPosition.y = this.player.y
  this.lastPosition.angle = this.player.angle
}

window.RemotePlayer = RemotePlayer
