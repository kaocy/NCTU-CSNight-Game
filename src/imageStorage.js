
/**
 * Define an object to hold all our images for the game so images
 * are only ever created once. This type of object is known as a
 * singleton.
 */
let imageStorage = new function () {
  // Define images
  this.background = new Image()
  this.ship = new Image()
  this.bullet = new Image()

  // Ensure all images have loaded before starting the game
  let numImages = 3; let numLoaded = 0
  function imageLoaded () {
    numLoaded++
    if (numLoaded === numImages) {
      window.init()
    }
  }

  this.background.onload = function () {
    imageLoaded()
  }
  this.ship.onload = function () {
    imageLoaded()
  }
  this.bullet.onload = function () {
    imageLoaded()
  }

  // Set images src
  this.background.src = '../imgs/bg.png'
  this.ship.src = '../imgs/ship.png'
  this.bullet.src = '../imgs/bullet.png'
}()
