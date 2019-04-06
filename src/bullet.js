
/**
 * Creates the Bullet object which the ship fires. The bullets are
 * drawn on the "main" canvas.
 */
class Bullet extends Drawable {
  constructor () {
    super()
    this.alive = false // whether the bullet is currently in use
  }

  /**
   * Sets the bullet values
   */
  spawn (x, y, speed) {
    this.x = x
    this.y = y
    this.speed = speed
    this.alive = true
  }

  /**
   * Resets the bullet values
   */
  reset () {
    this.x = 0
    this.y = 0
    this.speed = 0
    this.alive = false
  }

  /**
   * Uses a "dirty rectangle" to erase the bullet and moves it.
   * Returns true if the bullet moved off the screen,
   * indicating that the bullet is ready to be cleared by the pool,
   * otherwise draws the bullet.
   */
  draw () {
    this.context.clearRect(this.x, this.y, this.width, this.height)
    this.y -= this.speed
    if (this.y <= 0 - this.height) {
      return true
    } else {
      this.context.drawImage(imageStorage.bullet, this.x, this.y)
      return false
    }
  }
}
