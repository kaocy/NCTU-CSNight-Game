
import Bullet from './bullet'
import Enemy from './enemy'
import imageStorage from './imageStorage'

// 物件池 預先建立一定數量的物件 讓會一直出現和消失的物件可以重複使用
class Pool {
  constructor (size, type) {
    this.size = size // 陣列的大小
    this.pool = []
    this.type = type // 物件的種類
  }

  // 根據不同的物件種類 在陣列中塞入固定數量的物件
  init () {
    if (this.type === 'bullet') {
      for (let i = 0; i < this.size; i++) {
        let bullet = new Bullet('bullet')
        bullet.init(0, 0, imageStorage.bullet.width, imageStorage.bullet.height)
        this.pool.push(bullet)
      }
    }
    else if (this.type === 'enemy') {
      for (let i = 0; i < this.size; i++) {
        let enemy = new Enemy()
        enemy.init(0, 0, imageStorage.enemy.width, imageStorage.enemy.height)
        this.pool.push(enemy)
      }
    }
    else if (this.type === 'enemyBullet') {
      for (let i = 0; i < this.size; i++) {
        let enemyBullet = new Bullet('enemyBullet')
        enemyBullet.init(0, 0, imageStorage.enemyBullet.width, imageStorage.enemyBullet.height)
        this.pool.push(enemyBullet)
      }
    }
  }

  // 取出陣列中的最後一個元素 初始化後放到陣列最前面
  get (x, y, speed) {
    if (!this.pool[this.size - 1].alive) {
      this.pool[this.size - 1].set(x, y, speed)
      this.pool.unshift(this.pool.pop())
    }
  }

  // 取出陣列中的最後兩個元素 初始化後放到陣列最前面 (ship發射子彈用)
  getTwo (x1, y1, speed1, x2, y2, speed2) {
    if (!this.pool[this.size - 1].alive &&
        !this.pool[this.size - 2].alive) {
      this.get(x1, y1, speed1)
      this.get(x2, y2, speed2)
    }
  }

  // 回傳所有使用中的物件
  getAliveObjects () {
    let array = []
    this.pool.forEach(obj => {
      if (obj.alive) {
        array.push(obj)
      }
    })
    return array
  }

  // 移動陣列中正在使用中的物件
  animate () {
    for (let i = 0; i < this.size; i++) {
      // 遇到不是使用中的就跳出 (使用中的會在陣列前面)
      if (!this.pool[i].alive) break

      // 如果使用中的物件超出畫布範圍 重置後放回陣列最後面
      if (this.pool[i].move()) {
        this.pool[i].reset()
        this.pool.push((this.pool.splice(i, 1))[0])
      }
    }
  }
}

export default Pool
