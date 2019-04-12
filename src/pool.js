
import Bullet from './bullet'
import imageStorage from './imageStorage'

/**
 * Custom Pool object. Holds Bullet objects to be managed to prevent
 * garbage collection.
 */
class Pool {
  constructor (size, type) {
    this.size = size // Max bullets allowed in the pool
    this.pool = []
    this.type = type
  }

  /**
   * Populates the pool array with given objects
   */
  init () {
    if (this.type === 'bullet') {
      for (let i = 0; i < this.size; i++) {
        let bullet = new Bullet()
        bullet.init(0, 0, imageStorage.bullet.width, imageStorage.bullet.height)
        this.pool.push(bullet)
      }
    }
  }

  /**
   * Grabs the last item in the list and initializes it and
   * pushes it to the front of the array.
   */
  get (x, y, speed) {
    if (!this.pool[this.size - 1].alive) {
      this.pool[this.size - 1].spawn(x, y, speed)
      this.pool.unshift(this.pool.pop())
    }
  }

  /**
   * Used for the ship to be able to get two bullets at once. If
   * only the get() function is used twice, the ship is able to
   * fire and only have 1 bullet spawn instead of 2.
   */
  getTwo (x1, y1, speed1, x2, y2, speed2) {
    if (!this.pool[this.size - 1].alive &&
       !this.pool[this.size - 2].alive) {
      this.get(x1, y1, speed1)
      this.get(x2, y2, speed2)
    }
  }

  /**
   * Draws any in use Bullets. If a bullet goes off the screen,
   * clears it and pushes it to the front of the array.
   */
  animate () {
    for (let i = 0; i < this.size; i++) {
      // Only draw until we find a bullet that is not alive
      if (!this.pool[i].alive) break

      if (this.pool[i].draw()) {
        this.pool[i].reset()
        this.pool.push((this.pool.splice(i, 1))[0])
      }
    }
  }
}

export default Pool
