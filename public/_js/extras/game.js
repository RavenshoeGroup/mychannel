/* global Phaser RemotePlayer io */

var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'play','',true)

var socket // Socket connection
var player
var enemies
var cursor
var last_clicked
var randomX = 0;
var randomY = 0;
var left = false;
var right = false;
var playerTouch;
var pad
var stick1
var stick2
var dpr = window.devicePixelRatio;
if(dpr == 1){
	dpr = 1.5
}
var scaleRatio = dpr / 3
var manager = null
var emitter = null
var currentSpeed = 0
var playerCount = 0
var username = 'John Smith'
var bmd;


game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('menu',menuState); 
game.state.add('play',playState);

game.state.start('boot');

