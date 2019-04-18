
import Background from './background'
import Ship from './ship'
import Bullet from './bullet'
import Enemy from './enemy'
import Pool from './pool'
import QuadTree from './quadTree'
import imageStorage from './imageStorage'

// 整體遊戲 包含所有會用到的物件
class Game {
  init () {
    this.bgCanvas = document.getElementById('background')
    this.shipCanvas = document.getElementById('ship')
    this.mainCanvas = document.getElementById('main')

    // 如果瀏覽器不支援canvas就跳出
    if (!this.bgCanvas.getContext) return false

    this.bgCanvas.width = window.innerWidth
    this.bgCanvas.height = window.innerHeight
    this.shipCanvas.width = window.innerWidth
    this.shipCanvas.height = window.innerHeight
    this.mainCanvas.width = window.innerWidth
    this.mainCanvas.height = window.innerHeight

    this.bgContext = this.bgCanvas.getContext('2d')
    this.shipContext = this.shipCanvas.getContext('2d')
    this.mainContext = this.mainCanvas.getContext('2d')

    // 初始遊戲背景
    this.background = new Background()
    this.background.init(0, 0)

    // 初始玩家太空船
    this.ship = new Ship()
    let shipStartX = this.shipCanvas.width / 2 - imageStorage.ship.width / 2
    let shipStartY = this.shipCanvas.height * 0.85 + imageStorage.ship.height * 2
    this.ship.init(shipStartX, shipStartY, imageStorage.ship.width, imageStorage.ship.height)

    // 初始敵人太空船池
    this.enemyPool = new Pool(30, 'enemy')
    this.enemyPool.init()
    let numEnemy = 18
    let numEnemyRow = 6
    let enemyWidth = imageStorage.enemy.width
    let enemyHeight = imageStorage.enemy.height
    let spaceX = enemyWidth + 50
    let spaceY = enemyHeight * 1.5
    let firstX = (this.mainCanvas.width / 2) - (numEnemyRow / 2 - 0.5) * spaceX
    let firstY = -enemyHeight
    for (let i = 0; i < numEnemy; i++) {
      let enemyStartX = firstX + (i % numEnemyRow) * spaceX
      let enemyStartY = firstY + Math.floor(i / numEnemyRow) * spaceY
      this.enemyPool.get(enemyStartX, enemyStartY, 3)
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

    this.quadTree = new QuadTree({
      x: 0,
      y: 0,
      width: this.mainCanvas.width,
      height: this.mainCanvas.height
    }, 0)

    return true
  }

  detectCollision () {
    let objects1 = this.quadTree.getAllObjects()

    for (let i = 0; i < objects1.length; i++) {
      let objects2 = this.quadTree.findPossibleCollided(objects1[i])

      for (let j = 0; j < objects2.length; j++) {
        if (objects1[i].isCollidedWith(objects2[j])) {
          objects1[i].isCollided = true
          objects2[j].isCollided = true
        }
      }
    }
  }
}

export default Game
