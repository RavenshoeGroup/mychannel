/* global game */

var LocalPlayer = function (game) {
  // The base of our player
  //var startX = Math.round(Math.random() * (1000) - 500)
  //var startY = Math.round(Math.random() * (1000) - 500)

  this.player = game.add.sprite(250, 250, 'player')          

  // this.player.scale.setTo(0.5, 0.5);
  this.player.scale.setTo(scaleRatio, scaleRatio);
  //this.player.anchor.setTo(0.5, 0.5)
  this.player.animations.add('move', [0], 0, true)
  this.player.animations.add('stop', [0], 0, true)
  this.player.frame = 9;
  
  game.physics.enable(this.player, Phaser.Physics.ARCADE);
  this.player.enableBody = true; 
  this.player.body.maxVelocity.setTo(400, 400)
  this.player.body.immovable = true
  this.player.body.collideWorldBounds = true

  this.username = 'John Smith'

  // This will force it to decelerate and limit its speed
  //this.player.body.drag.setTo(200, 200)
  // this.player.body.drag.setTo(200)

  // var barConfig = {x: -5, y: 0};
  // this.healthbar = new HealthBar(game, barConfig);
  // this.player.addChild(this.healthbar.bgSprite)
  // this.player.addChild(this.healthbar.barSprite)  

}


LocalPlayer.prototype.update = function (shipEmitter) {  

  if(/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {

    currentSpeed = 400

    if (stick1.isDown){
      game.physics.arcade.velocityFromRotation(stick1.rotation, stick1.force * currentSpeed, this.player.body.velocity);
      this.player.rotation = stick1.rotation;
    }

  }else{

    if(cursor.left.isDown){
      this.player.angle -= 4
    }else if(cursor.right.isDown) {
      this.player.angle += 4
    }


    if (cursor.up.isDown){
      // The speed we'll travel at
      currentSpeed = 400
    }else{
      if (currentSpeed > 0) {
          currentSpeed -= 4
      }
    }

    if (cursor.down.isDown){
      // The speed we'll travel at
      currentSpeed = -100
    }else{
      if (currentSpeed < 0) {
        currentSpeed += 4
      }
    }

   game.physics.arcade.velocityFromRotation(this.player.rotation, currentSpeed, this.player.body.velocity)

  }  

  if(currentSpeed > 0){
    this.player.animations.play('move')
  }else{
    this.player.animations.play('stop')
  }


  //NEW CODE TO EMIT
  this.newServerUpdate = { x: this.player.x, y: this.player.y, angle: this.player.angle, username: this.username }
  this.sendToServer(this.newServerUpdate);


}


LocalPlayer.prototype.sendToServer = function (serverUpdate) {
  setTimeout(function(){ socket.emit('move player', serverUpdate); }, 100);  
}


window.LocalPlayer = LocalPlayer
