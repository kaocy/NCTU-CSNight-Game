
import Drawable from './drawable'
import ObjectPool from './objectPool'
import { game, imageStorage, soundStorage } from './main'
import { KEY_STATUS } from './keyboard'
import './touchEvent'

// 玩家用的太空船 可以移動和發射子彈
class Ship extends Drawable {
  constructor () {
    super()
    this.alive = true
    this.speed = 3
    this.bulletPool = new ObjectPool(30, 'bullet')
    this.counter = 0
    this.fireRate = 15
    this.type = 'ship'
    this.collidableWith.push('enemyBullet')

    this.draw = this.draw.bind(this)
    this.clear = this.clear.bind(this)
    this.move = this.move.bind(this)
    this.fire = this.fire.bind(this)
  }

  reset () {
    this.alive = false
    this.isCollided = false
  }

  draw () {
    this.context.drawImage(imageStorage.ship, this.x, this.y)
  }

  clear () {
    this.context.clearRect(this.x, this.y, this.width, this.height)
  }

  move () {
    // 判斷是否按下方向鍵
    if (KEY_STATUS.left || KEY_STATUS.right ||
        KEY_STATUS.down || KEY_STATUS.up) {
      
      this.clear()

      // 根據不同的方向鍵 更新座標
      if (KEY_STATUS.left) {
        this.x -= this.speed
        if (this.x <= 0) {
          this.x = 0
        }
      }
      else if (KEY_STATUS.right) {
        this.x += this.speed
        if (this.x >= this.canvasWidth - this.width) {
          this.x = this.canvasWidth - this.width
        }
      }
      else if (KEY_STATUS.up) {
        this.y -= this.speed
        if (this.y <= this.canvasHeight / 4 * 3) {
          this.y = this.canvasHeight / 4 * 3
        }
      }
      else if (KEY_STATUS.down) {
        this.y += this.speed
        if (this.y >= this.canvasHeight - this.height) {
          this.y = this.canvasHeight - this.height
        }
      }
    }

    // 暫定被敵方子彈射中就結束
    if (this.isCollided) {
      this.reset()
      game.over()
    }
    else {
      this.draw()
    }
  }

  fire () {
    this.counter++
    // 如果按下空白鍵且在發射速度限制內 從子彈池中取出兩發子彈發射
    if (KEY_STATUS.space && this.counter >= this.fireRate) {
      this.counter = 0
      this.bulletPool.getTwo(this.x + 6, this.y, 3,
                             this.x + 33, this.y, 3)
      soundStorage.laser.get()
    }
  }
}

export default Ship
