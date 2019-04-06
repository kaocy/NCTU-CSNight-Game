
/**
 * Create the Ship object that the player controls. The ship is
 * drawn on the "ship" canvas and uses dirty rectangles to move
 * around the screen.
 */
class Ship extends Drawable {
  constructor () {
    super()
    this.speed = 3
    this.bulletPool = new Pool(30, 'bullet')
    this.bulletPool.init()
    this._counter = 0
    this._fireRate = 15
  }

  draw () {
    this.context.drawImage(imageStorage.ship, this.x, this.y)
  }

  move () {
    let canvasWidth = Ship.prototype.canvasWidth
    let canvasHeight = Ship.prototype.canvasHeight
    this._counter++

    // Determine if the action is move action
    if (KEY_STATUS.left || KEY_STATUS.right ||
        KEY_STATUS.down || KEY_STATUS.up) {
      // The ship moved, so erase it's current image so it can
      // be redrawn in it's new location
      this.context.clearRect(this.x, this.y, this.width, this.height)

      // Update x and y according to the direction to move and redraw the ship.
      // Change the else if's to if statements to have diagonal movement.
      if (KEY_STATUS.left) {
        this.x -= this.speed
        if (this.x <= 0) {
          this.x = 0
        }
      } else if (KEY_STATUS.right) {
        this.x += this.speed
        if (this.x >= canvasWidth - this.width) {
          this.x = canvasWidth - this.width
        }
      } else if (KEY_STATUS.up) {
        this.y -= this.speed
        if (this.y <= canvasHeight / 4 * 3) {
          this.y = canvasHeight / 4 * 3
        }
      } else if (KEY_STATUS.down) {
        this.y += this.speed
        if (this.y >= canvasHeight - this.height) {
          this.y = canvasHeight - this.height
        }
      }

      // Finish by redrawing the ship
      this.draw()
    }

    if (KEY_STATUS.space && this._counter >= this._fireRate) {
      this.fire()
      this._counter = 0
    }
  }

  /**
   * Fires two bullets
   */
  fire () {
    this.bulletPool.getTwo(this.x + 6, this.y, 3,
      this.x + 33, this.y, 3)
  }
}
