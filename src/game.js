
import Text from 'text'
import Background from 'background'
import Ship from 'ship'
import Bullet from 'bullet'
import Enemy from 'enemy'
import ObjectPool from 'objectPool'
import QuadTree from 'quadTree'
import { imageStorage, soundStorage, animate } from 'main'

// 整體遊戲 包含所有會用到的物件
class Game {
  constructor () {
    this.init = this.init.bind(this)
    this.introduce = this.introduce.bind(this)
    this.start = this.start.bind(this)
    this.over = this.over.bind(this)
    this.restart = this.restart.bind(this)
    this.setBackground = this.setBackground.bind(this)
    this.setShip = this.setShip.bind(this)
    this.setEnemy = this.setEnemy.bind(this)
    this.setEnemyBullet = this.setEnemyBullet.bind(this)
    this.detectCollision = this.detectCollision.bind(this)
  }

  init () {
    this.textBgCanvas = document.getElementById('text-background')
    this.textCanvas = document.getElementById('text')
    this.bgCanvas = document.getElementById('background')
    this.shipCanvas = document.getElementById('ship')
    this.mainCanvas = document.getElementById('main')

    // 如果瀏覽器不支援canvas就跳出
    if (!this.bgCanvas.getContext) return false

    this.textBgCanvas.width = window.innerWidth
    this.textBgCanvas.height = window.innerHeight

    this.textCanvas.width = window.innerWidth
    this.textCanvas.height = window.innerHeight
    this.bgCanvas.width = window.innerWidth
    this.bgCanvas.height = window.innerHeight
    this.shipCanvas.width = window.innerWidth
    this.shipCanvas.height = window.innerHeight
    this.mainCanvas.width = window.innerWidth
    this.mainCanvas.height = window.innerHeight

    this.textBgContext = this.textBgCanvas.getContext('2d')
    this.textBgContext.fillStyle = 'black'
    this.textBgContext.fillRect(0, 0, this.textBgCanvas.width, this.textBgCanvas.height)

    this.textContext = this.textCanvas.getContext('2d')
    this.textContext.font = '60px k8x12'
    this.textContext.fillStyle = 'white'

    this.bgContext = this.bgCanvas.getContext('2d')
    this.shipContext = this.shipCanvas.getContext('2d')
    this.mainContext = this.mainCanvas.getContext('2d')

    // 綁定canvas資訊到物件的prototype上
    Text.prototype.context = this.textContext
    Text.prototype.canvasWidth = this.textCanvas.width
    Text.prototype.canvasHeight = this.textCanvas.height
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

    // 初始遊戲背景
    this.background = new Background()
    this.setBackground()

    // 初始玩家太空船
    this.ship = new Ship()
    this.setShip()

    // 初始敵人太空船池
    this.enemyPool = new ObjectPool(30, 'enemy')
    this.setEnemy()

    // 初始敵人子彈池
    this.enemyBulletPool = new ObjectPool(50, 'enemyBullet')
    this.setEnemyBullet()

    // 初始四元樹
    this.quadTree = new QuadTree({
      x: 0,
      y: 0,
      width: this.mainCanvas.width,
      height: this.mainCanvas.height
    }, 0)

    // 起始分數
    this.playerScore = 0

    return true
  }

  introduce () {
    let text = new Text()
    let text2 = new Text()
    let text3 = new Text()
    let text4 = new Text()
    let text5 = new Text()
    text.init('從前從前...', text2.register)
    text2.init('在一個偏僻的美食沙漠，有一間號稱工具人大學', text3.register)
    text3.init('傳聞裡面有很多的考驗...', text4.register)
    text4.init('想到這裡就覺得...', text5.register)
    text5.init('好緊張好緊張歐。･ﾟ･(つд`ﾟ)･ﾟ･', this.start)
    text.register()
  }

  start () {
    this.ship.draw()
    soundStorage.backgroundAudio.currentTime = 0
    soundStorage.backgroundAudio.play()
    animate()
  }

  over () {
    soundStorage.backgroundAudio.pause()
    soundStorage.gameOverAudio.currentTime = 0
    soundStorage.gameOverAudio.play()
    document.getElementById('game-over').style.display = 'block'
  }

  // 將物件位置初始化並清空畫布後再開始
  restart () {
    soundStorage.gameOverAudio.pause()
    document.getElementById('game-over').style.display = 'none'

    this.textBgContext.clearRect(0, 0, this.textBgContext.width, this.textBgContext.height)
    this.bgContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height)
    this.shipContext.clearRect(0, 0, this.shipCanvas.width, this.shipCanvas.height)
    this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height)
    
    this.setBackground()
    this.setShip()
    this.setEnemy()
    this.setEnemyBullet()
    this.quadTree.clear()
    this.playerScore = 0
    
    this.start()
  }

  setBackground () {
    this.background.init(0, 0, this.bgCanvas.width, this.bgCanvas.height)
  }

  setShip () {
    let shipStartX = this.shipCanvas.width / 2 - imageStorage.ship.width / 2
    let shipStartY = this.shipCanvas.height * 0.85 + imageStorage.ship.height * 2
    this.ship.init(shipStartX, shipStartY, window.innerWidth * 0.16, window.innerHeight * 0.125)
    this.ship.alive = true
    this.ship.bulletPool.init()
  }

  setEnemy () {
    this.enemyPool.init()

    let numEnemy = 18
    let numEnemyRow = 6
    let enemyWidth = window.innerWidth * 0.1
    let enemyHeight = window.innerWidth * 0.1
    let spaceX = enemyWidth + window.innerWidth * 0.03
    let spaceY = enemyHeight + window.innerWidth * 0.03
    let firstX = (this.mainCanvas.width / 2) - (numEnemyRow / 2 - 0.5) * spaceX
    let firstY = -enemyHeight
    for (let i = 0; i < numEnemy; i++) {
      let enemyStartX = firstX + (i % numEnemyRow) * spaceX
      let enemyStartY = firstY + Math.floor(i / numEnemyRow) * spaceY
      this.enemyPool.get(enemyStartX, enemyStartY, 3)
    }
  }

  setEnemyBullet () {
    this.enemyBulletPool.init()
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
