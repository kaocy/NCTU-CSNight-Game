
import Background from './background'
import Ship from './ship'
import Bullet from './bullet'
import imageStorage from './imageStorage'

/**
 * Creates the Game object which will hold all objects and data for the game.
 */
class Game {
  /**
   * Gets canvas information and context and sets up all game objects.
   * Returns true if the canvas is supported and false if it is not.
   * This is to stop the animation script from constantly running on older browsers.
   */
  init () {
    // Get the canvas element
    this.bgCanvas = document.getElementById('background')
    this.shipCanvas = document.getElementById('ship')
    this.mainCanvas = document.getElementById('main')
    this.bgCanvas.width = window.innerWidth
    this.bgCanvas.height = window.innerHeight
    this.shipCanvas.width = window.innerWidth
    this.shipCanvas.height = window.innerHeight
    this.mainCanvas.width = window.innerWidth
    this.mainCanvas.height = window.innerHeight
    // Test to see if canvas is supported
    if (!this.bgCanvas.getContext) return false

    this.bgContext = this.bgCanvas.getContext('2d')
    this.shipContext = this.shipCanvas.getContext('2d')
    this.mainContext = this.mainCanvas.getContext('2d')

    // Initialize the background object
    this.background = new Background()
    this.background.init(0, 0)

    // Initialize the ship object
    this.ship = new Ship()
    let shipStartX = this.shipCanvas.width / 2 - imageStorage.ship.width
    let shipStartY = this.shipCanvas.height / 4 * 3 + imageStorage.ship.height * 2
    this.ship.init(shipStartX, shipStartY, imageStorage.ship.width, imageStorage.ship.height)

    // Initialize objects to contain their context and canvas information
    Background.prototype.context = this.bgContext
    Background.prototype.canvasWidth = this.bgCanvas.width
    Background.prototype.canvasHeight = this.bgCanvas.height
    Ship.prototype.context = this.shipContext
    Ship.prototype.canvasWidth = this.shipCanvas.width
    Ship.prototype.canvasHeight = this.shipCanvas.height
    Bullet.prototype.context = this.mainContext
    Bullet.prototype.canvasWidth = this.mainCanvas.width
    Bullet.prototype.canvasHeight = this.mainCanvas.height

    return true
  }
}

export default Game
