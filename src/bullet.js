
import Drawable from './drawable'
import imageStorage from './imageStorage'

// 玩家與敵人太空船發射的子彈
class Bullet extends Drawable {
  constructor (type) {
    super()
    this.alive = false // 是否正在使用
    this.type = type   // 區分我方子彈或是敵人子彈
  }

  // 設定子彈座標和速度 (變成使用中)
  set (x, y, speed) {
    this.x = x
    this.y = y
    this.speed = speed
    this.alive = true
  }

  // 重置子彈座標和速度 (變成非使用中)
  reset () {
    this.x = 0
    this.y = 0
    this.speed = 0
    this.alive = false
  }

  draw () {
    let img = (this.type === 'bullet') ? imageStorage.bullet : imageStorage.enemyBullet
    this.context.drawImage(img, this.x, this.y)
  }

  clear() {
    this.context.clearRect(this.x, this.y, this.width, this.height)
  }

  // 移動子彈 如果超出範圍回傳true 否則畫出子彈並回傳false
  move () {
    this.clear()
    
    this.y -= this.speed

    if (this.type === 'bullet' && this.y <= 0 - this.height) {
      return true
    }
    else if (this.type === 'enemyBullet' && this.y >= this.canvasHeight) {
      return true
    }
    else {
      this.draw()
      return false
    }
  }
}

export default Bullet
