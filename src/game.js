
import Text from 'text'
import Background from 'background'
import QuiThink from 'quiThink'
import { data, QUI } from './assets/resources/question'
import { imageStorage } from 'main'
import { recordScore } from 'api'
import { game } from './main';

// 整體遊戲 包含所有會用到的物件
class Game {
  constructor () {
    this.totalScore = 0 // 所有向度的總分
    this.currentScore = 0
    this.playing = null
    this.init = this.init.bind(this)
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
        this.playing = i
        QUI.level = e.target.innerHTML
        this.quiThink = new QuiThink(8, this.over)
        document.getElementById('quiMenu').bindAnimation(
          'slideOut',1,
          (self)=> {
            self.style.display = 'none'
            document.getElementsByClassName('quiMenuItem')[i].style.pointerEvents = 'none'
            this.quiThink.load()
          }
        )
      }, false)
    }
    
    return true
  }

  introduce () {

    // let text = new Text()
    // text.init('從前從前...', this.start)
    // text.register()
    this.start()
  }

  start () {
    
    document.getElementById('quiMenu').style.display = 'block'
    document.getElementById('quiMenu').bindAnimation('initMove',2)

  }
  
  over () {
    document.getElementById('game-over').style.display = 'block'
    if(document.getElementsByClassName('played').length === 9){
      document.getElementById('return').innerHTML = '重新開始'
      document.getElementById('allScore').innerHTML = this.totalScore
      document.getElementsByTagName('tr')[1].style.display = 'table-row'
      document.getElementById('game-over').bindAnimation('Load2',.5,()=>{
          document.getElementById('return').style.display = 'block'
        })
    }
    else{
      document.getElementById('allScore').innerHTML = this.totalScore
      document.getElementById('currentScore').innerHTML = this.currentScore
      document.getElementsByTagName('tr')[0].style.display = 'table-row'
      document.getElementById('game-over').bindAnimation('Load1',.5,(e)=>{
        document.getElementsByTagName('tr')[1].style.display = 'table-row'
        e.bindAnimation('Load2',0.5,(e)=>{
          document.getElementById('return').style.display = 'block'
          e.bindAnimation('Show',.3)
        })
      })
    }
  }

  // 將物件位置初始化並清空畫布後再開始
  restart () {
    if(document.getElementsByClassName('played').length === 9){
      location.reload()
    }
    else{
      document.getElementById('game-over').style.display = 'none'
      document.getElementsByTagName('tr')[0].style.display = 'none'
      document.getElementsByTagName('tr')[1].style.display = 'none'
      document.getElementById('return').style.display = 'none'
      this.textBgContext.clearRect(0, 0, this.textBgContext.width, this.textBgContext.height)
      this.bgContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height)
  
      this.setBackground()
      this.quiThink.reset()
  
      document.getElementById('quiMenu').style.display = 'block'
      document.getElementById('quiMenu').bindAnimation('initMove',1.5,()=>{
        document.getElementsByClassName('quiMenuItem')[this.playing].classList.add('played')
      })
    }
  }

  setBackground () {
    this.background.init(0, 0, this.bgCanvas.width, this.bgCanvas.height)
  }

  addScore (score) {
    this.currentScore = score
    this.totalScore += score

    // 送api request
    recordScore({
      pid: window.localStorage.getItem('pid'),
      score: this.totalScore
    })
  }
}

export default Game
