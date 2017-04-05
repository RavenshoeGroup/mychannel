/* ************************************************
** GAME PLAYER CLASS
************************************************ */
var Player = function (startId, startX, startY, startAngle, startUsername) {
  var x = startX
  var y = startY
  var angle = startAngle
  var username = startUsername
  var id = startId

  console.log(x + ' ' + y + ' ' + angle + ' ' + username + ' ' + id)

  // Getters and setters
  var getX = function () {
    return x
  }

  var getY = function () {
    return y
  }

  var getAngle = function () {
    return angle
  }

  var getUsername = function () {
    return username
  }

  var setX = function (newX) {
    x = newX
  }

  var setY = function (newY) {
    y = newY
  }

  var setAngle = function (newAngle) {
    angle = newAngle
  }

  var setUsername = function (newUsername) {
    tean = username
  }

  // Define which variables and methods can be accessed
  return {
    getX: getX,
    getY: getY,
    getAngle: getAngle,
    getUsername: getUsername,
    setX: setX,
    setY: setY,
    setAngle: setAngle,
    setUsername: setUsername,
    id: id
  }
}

// Export the Player class so you can use it in
// other files by using require("Player")
module.exports = Player
