
import Text from 'text'
import Background from 'background'
import QuiThink from 'quiThink'
import { data, QUI } from './assets/resources/question'
import { imageStorage, soundStorage } from 'main'
import { recordScore } from 'api'

// 整體遊戲 包含所有會用到的物件
class Game {
  constructor () {
    this.totalScore = 0 // 所有向度的總分
    this.init = this.init.bind(this)
    this.introduce = this.introduce.bind(this)
    this.start = this.start.bind(this)
    this.over = this.over.bind(this)
    this.restart = this.restart.bind(this)
    this.setBackground = this.setBackground.bind(this)
    this.addScore = this.addScore.bind(this)
  }

  init () {
    this.textBgCanvas = document.getElementById('text-background')
    this.textCanvas = document.getElementById('text')
    this.bgCanvas = document.getElementById('background')

    // 如果瀏覽器不支援canvas就跳出
    if (!this.bgCanvas.getContext) return false

    this.textBgCanvas.width = window.innerWidth
    this.textBgCanvas.height = window.innerHeight
    this.textCanvas.width = window.innerWidth
    this.textCanvas.height = window.innerHeight
    this.bgCanvas.width = window.innerWidth
    this.bgCanvas.height = window.innerHeight

    this.textBgContext = this.textBgCanvas.getContext('2d')
    this.textBgContext.fillStyle = 'black'
    this.textBgContext.fillRect(0, 0, this.textBgCanvas.width, this.textBgCanvas.height)

    this.textContext = this.textCanvas.getContext('2d')
    this.textContext.font = '60px k8x12'
    this.textContext.fillStyle = 'white'

    this.bgContext = this.bgCanvas.getContext('2d')

    // 綁定canvas資訊到物件的prototype上
    Text.prototype.context = this.textContext
    Text.prototype.canvasWidth = this.textCanvas.width
    Text.prototype.canvasHeight = this.textCanvas.height
    Background.prototype.context = this.bgContext
    Background.prototype.canvasWidth = this.bgCanvas.width
    Background.prototype.canvasHeight = this.bgCanvas.height

    // 初始遊戲背景
    this.background = new Background()
    this.setBackground()

    // Menu Item 綁定 click 事件
    for(let i = 0; i < 10; i++){
      document.getElementsByClassName('quiMenuItem')[i].addEventListener('click', (e) => {
        document.getElementById('quiMenu').style.display = 'none'
        this.quiThink = new QuiThink(8, this.over)
        document.getElementsByClassName('quiMenuItem')[i].classList.add('played')
        QUI.level = e.target.innerHTML
        this.quiThink.load()
      }, false)
    }
    
    return true
  }

  introduce () {
    document.getElementsByClassName('score')[0].style.display = 'none'

    // let text = new Text()

    // text.init('從前從前...', this.start)
    // text.register()
    this.start()
  }

  start () {
    // document.getElementsByClassName('score')[0].style.display = 'block'

    // soundStorage.backgroundAudio.currentTime = 0
    // soundStorage.backgroundAudio.play()

    document.getElementById('quiMenu').style.display = 'block'
    document.getElementById('quiMenu').classList.add('initMove')
  }

  over () {
    // soundStorage.backgroundAudio.pause()
    // soundStorage.gameOverAudio.currentTime = 0
    // soundStorage.gameOverAudio.play()
    document.getElementById('game-over').style.display = 'block'
    document.getElementById('quiMenu').classList.remove('initMove')

    // 送api request
    // recordScore({
    //   pid: window.getCookie('pid'),
    //   score: this.totalScore
    // })
  }

  // 將物件位置初始化並清空畫布後再開始
  restart () {
    // soundStorage.gameOverAudio.pause()
    document.getElementById('game-over').style.display = 'none'

    this.textBgContext.clearRect(0, 0, this.textBgContext.width, this.textBgContext.height)
    this.bgContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height)

    this.setBackground()
    this.quiThink.reset()

    this.start()
  }

  setBackground () {
    this.background.init(0, 0, this.bgCanvas.width, this.bgCanvas.height)
  }

  addScore (score) {
    this.totalScore += score
    console.log(this.totalScore)
  }
}

export default Game
