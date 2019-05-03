
import Drawable from 'drawable'
import { imageStorage, soundStorage, game } from 'main'

// 敵人太空船 自動移動和發射子彈
class Enemy extends Drawable {
  constructor () {
    super()
    this.alive = false
    this.chance = 0 // 發射子彈的機率
    this.percentFire = 0.01 // 發射子彈的門檻
    this.type = 'enemy'
    this.collidableWith.push('bullet')
    this.imageCounter = 0

    this.set = this.set.bind(this)
    this.reset = this.reset.bind(this)
    this.draw = this.draw.bind(this)
    this.clear = this.clear.bind(this)
    this.move = this.move.bind(this)
    this.fire = this.fire.bind(this)
  }

  // 設定敵人座標、速度、移動範圍 (變成使用中)
  set (x, y, speed) {
    this.x = x
    this.y = y
    this.speed = speed
    this.speedX = 0
    this.speedY = speed
    this.alive = true
    this.leftEdge = this.x - 150
    this.rightEdge = this.x + 150
    this.bottomEdge = this.y + 140
  }

  // 重置敵人座標和速度 (變成非使用中)
  reset () {
    this.x = 0
    this.y = 0
    this.speed = 0
    this.speedX = 0
    this.speedY = 0
    this.alive = false
    this.isCollided = false
  }

  draw () {
    // GIF效果
    let img = (this.imageCounter < 5) ? imageStorage.enemy1 : imageStorage.enemy2
    this.imageCounter++
    if (this.imageCounter == 10) this.imageCounter -= 10
    this.context.drawImage(img, this.x, this.y, window.innerWidth * 0.07, window.innerWidth * 0.07)
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
    } else if (this.x >= this.rightEdge + this.width) {
      this.speedX = -this.speed
    }
    // 一開始會往下移動 到定位後才會給x方向的速度
    else if (this.y >= this.bottomEdge) {
      this.speed = 1.5
      this.speedY = 0
      this.y -= 5
      this.speedX = -this.speed
    }

    // 被子彈射到就回傳true (在pool中會被重置)
    if (this.isCollided) {
      game.playerScore += 10
      soundStorage.explosion.get()
      return true
    }

    this.draw()

    // 有一定機率發射子彈
    this.chance = Math.floor(Math.random() * 101)
    if (this.chance / 100 < this.percentFire) {
      this.fire()
    }

    return false
  }

  fire () {
    // 從子彈池中取出一發子彈發射
    game.enemyBulletPool.get(this.x + this.width / 2, this.y + this.height, -2.5)
  }
}

export default Enemy
