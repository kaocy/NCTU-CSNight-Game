
// import { Background } from './background'

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
    // this.bgCanvas.width = window.innerWidth;
    // this.bgCanvas.height = window.innerHeight;

    // Test to see if canvas is supported
    if (!this.bgCanvas.getContext) return false

    this.bgContext = this.bgCanvas.getContext('2d')

    // Initialize the background object
    this.background = new Background()
    this.background.init(0, 0) // Set draw point to 0,0
    // Initialize objects to contain their context and canvas information
    this.background.context = this.bgContext
    this.background.canvasWidth = this.bgCanvas.width
    this.background.canvasHeight = this.bgCanvas.height

    return true
  }
}

// export default Game
