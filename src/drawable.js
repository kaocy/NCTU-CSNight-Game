
/**
 * Creates the Drawable object which will be the base class for
 * all drawable objects in the game.
 * Sets up default variables that all child objects will inherit,
 * as well as the default functions.
 */
class Drawable {
  constructor () {
    this.speed = 0
    this.canvasWidth = 0
    this.canvasHeight = 0
  }

  init (x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  // Define abstract function to be implemented in child objects
  draw () {}
}

// export { Drawable }
