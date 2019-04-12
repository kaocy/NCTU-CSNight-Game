
import Background from './background'
import Ship from './ship'
import Bullet from './bullet'
import Enemy from './enemy'
import Pool from './pool'
import imageStorage from './imageStorage'

// 整體遊戲 包含所有會用到的物件
class Game {
  init () {
    this.bgCanvas = document.getElementById('background')
    this.shipCanvas = document.getElementById('ship')
    this.mainCanvas = document.getElementById('main')

    // 如果瀏覽器不支援canvas就跳出
    if (!this.bgCanvas.getContext) return false

    this.bgContext = this.bgCanvas.getContext('2d')
    this.shipContext = this.shipCanvas.getContext('2d')
    this.mainContext = this.mainCanvas.getContext('2d')

    // 初始遊戲背景
    this.background = new Background()
    this.background.init(0, 0)

    // 初始玩家太空船
    this.ship = new Ship()
    let shipStartX = this.shipCanvas.width / 2 - imageStorage.ship.width
    let shipStartY = this.shipCanvas.height / 4 * 3 + imageStorage.ship.height * 2
    this.ship.init(shipStartX, shipStartY, imageStorage.ship.width, imageStorage.ship.height)

    // 初始敵人太空船池
    this.enemyPool = new Pool(30, 'enemy')
    this.enemyPool.init()
    let numEnemy = 18
    let numEnemyRow = 6
    let enemyHeight = imageStorage.enemy.height
    let enemyWidth = imageStorage.enemy.width
    for (let i = 0; i < numEnemy; i++) {
      let enemyStartX = 100 + (i % numEnemyRow) * (enemyWidth + 25)
      let enemyStartY = -enemyHeight + Math.floor(i / numEnemyRow) * (enemyHeight * 1.5)
      this.enemyPool.get(enemyStartX, enemyStartY, 2)
    }

    // 初始敵人子彈池
    this.enemyBulletPool = new Pool(50, 'enemyBullet')
    this.enemyBulletPool.init()

    // 綁定canvas資訊到物件的prototype上
    Background.prototype.context = this.bgContext
    Background.prototype.canvasWidth = this.bgCanvas.width
    Background.prototype.canvasHeight = this.bgCanvas.height
    Ship.prototype.context = this.shipContext
    Ship.prototype.canvasWidth = this.shipCanvas.width
    Ship.prototype.canvasHeight = this.shipCanvas.height
    Bullet.prototype.context = this.mainContext
    Bullet.prototype.canvasWidth = this.mainCanvas.width
    Bullet.prototype.canvasHeight = this.mainCanvas.height
    Enemy.prototype.context = this.mainContext
    Enemy.prototype.canvasWidth = this.mainCanvas.width
    Enemy.prototype.canvasHeight = this.mainCanvas.height

    return true
  }
}

export default Game
