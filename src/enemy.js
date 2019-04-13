
import Drawable from './drawable'
import imageStorage from './imageStorage'
import { game } from './main'

// 敵人太空船 自動移動和發射子彈
class Enemy extends Drawable {
  constructor () {
    super()
    this.alive = false
    this._chance = 0  // 發射子彈的機率
    this._percentFire = 0.01 // 發射子彈的門檻
  }

  // 設定敵人座標、速度、移動範圍 (變成使用中)
  set (x, y, speed) {
    this.x = x
    this.y = y
    this.speed = speed
    this.speedX = 0
    this.speedY = speed
    this.alive = true
    this.leftEdge = this.x - 90
    this.rightEdge = this.x + 90
    this.bottomEdge = this.y + 70
  }

  // 重置敵人座標和速度 (變成非使用中)
  reset () {
    this.x = 0
    this.y = 0
    this.speed = 0
    this.speedX = 0
    this.speedY = 0
    this.alive = false
  }

  draw () {
    this.context.drawImage(imageStorage.enemy, this.x, this.y)
  }

  clear () {
    this.context.clearRect(this.x, this.y, this.width, this.height)
  }

  move () {
    this.clear()

    this.x += this.speedX
    this.y += this.speedY
    if (this.x <= this.leftEdge) {
      this.speedX = this.speed
    }
    else if (this.x >= this.rightEdge + this.width) {
      this.speedX = -this.speed
    }
    // 一開始會往下移動 到定位後才會給x方向的速度
    else if (this.y >= this.bottomEdge) {
      this.speed = 1.5
      this.speedY = 0
      this.y -= 5
      this.speedX = -this.speed
    }

    this.draw()

    // 有一定機率發射子彈
    this._chance = Math.floor(Math.random() * 101)
    if (this._chance / 100 < this._percentFire) {
      this.fire()
    }
  }

  fire () {
    // 從子彈池中取出一發子彈發射
    game.enemyBulletPool.get(this.x + this.width / 2, this.y + this.height, -2.5)
  }
}

export default Enemy
