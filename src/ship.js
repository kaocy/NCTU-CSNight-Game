
import Drawable from './drawable'
import Pool from './pool'
import imageStorage from './imageStorage'
import { KEY_STATUS } from './keyboard'

// 玩家用的太空船 可以移動和發射子彈
class Ship extends Drawable {
  constructor () {
    super()
    this.speed = 3
    this.bulletPool = new Pool(30, 'bullet')
    this.bulletPool.init()
    this.counter = 0
    this.fireRate = 15
    this.type = 'ship'
    this.collidableWith.push('enemyBullet')
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
    }
  }
}

export default Ship
