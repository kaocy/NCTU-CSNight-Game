
import Drawable from './drawable'
import imageStorage from './imageStorage'

/**
 * Creates the Background object which will become a child of
 * the Drawable object. The background is drawn on the "background"
 * canvas and creates the illusion of moving by panning the image.
 */
class Background extends Drawable {
  constructor () {
    super()
    this.empty = null
    this.speed = 1 // Redefine speed of the background for panning
  }

  // Implement abstract function
  draw () {
    let canvasHeight = Background.prototype.canvasHeight
    // Pan background
    this.y += this.speed
    this.context.drawImage(imageStorage.background, this.x, this.y, window.innerWidth, window.innerHeight)

    // Draw another image at the top edge of the first image
    this.context.drawImage(imageStorage.background, this.x, this.y - canvasHeight, window.innerWidth, window.innerHeight)

    // If the image scrolled off the screen, reset
    if (this.y >= canvasHeight) {
      this.y = 0
    }
  }
}

export default Background
