
// import { Drawable } from './drawable'

/**
 * Creates the Background object which will become a child of
 * the Drawable object. The background is drawn on the "background"
 * canvas and creates the illusion of moving by panning the image.
 */
class Background extends Drawable {
  constructor () {
    super()
    this.empty = null
    this.image = new Image()
    this.image.src = '../imgs/bg.png'
    this.speed = 1 // Redefine speed of the background for panning
  }

  // Implement abstract function
  draw () {
    // Pan background
    this.y += this.speed
    this.context.drawImage(this.image, this.x, this.y)

    // Draw another image at the top edge of the first image
    this.context.drawImage(this.image, this.x, this.y - this.canvasHeight)

    // If the image scrolled off the screen, reset
    if (this.y >= this.canvasHeight) {
      this.y = 0
    }
  }
}

// export { Background }
