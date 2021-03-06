
import Timer from 'timer'
import { game } from 'main'
import { QUI, section, data } from './assets/resources/question'

class QuiThink {
  constructor (interval = 8) {
    this.interval = interval // 一題的時間
    this.currentScore = 0    // 一個向度的總分
    this.sidebarScore = 0
    this.continuous = 0        // 連續答對題數
    this.correctNum = 0
    this.timer = new Timer()

    this.show = this.show.bind(this)
    this.clear = this.clear.bind(this)
    this.load = this.load.bind(this)
    this.reset = this.reset.bind(this)
    this.resetOption = this.resetOption.bind(this)
    this.setQuestion = this.setQuestion.bind(this)
    this.setQuiBar = this.setQuiBar.bind(this)
    this.checkAns = this.checkAns.bind(this)
    this.transition = this.transition.bind(this)
  }

  show () {
    document.getElementById('quickThink').style.opacity = 1
    document.getElementById('quickThink').style.zIndex = 1080
    // qui element
        
    let top = document.getElementsByClassName('quiOption')[0].getBoundingClientRect().top
    let bottom = document.getElementsByClassName('quiOption')[3].getBoundingClientRect().bottom
    let height = bottom - top
    document.getElementById('quiBarContainer').style.top = `${top}px`
    document.getElementById('quiBarContainer').style.height = `${height}px`

    document.getElementById('quiTimer').style.opacity = 0
    document.getElementById('quiQuestion').style.opacity = 0
    document.getElementById('quiOptions').style.opacity = 0
  }

  clear () {
    document.getElementById('quickThink').style.opacity = 0
    document.getElementById('quickThink').style.zIndex = 0
  }

  // 開始問答
  load () {
    this.currentScore = 0
    // 隨機選出該向度的題目組
    QUI.random.length = 0
    while (QUI.random.length < QUI.length) {
      let length = data[QUI.level].length // 要生的向度的總題數
      let num = Math.floor((Math.random() * length))
      if (QUI.random.indexOf(num) === -1) QUI.random.push(num)
    }
    this.setQuestion()
  }

  reset () {
    QUI.qno = 0
    document.getElementById('showScore').innerHTML = 0
    this.currentScore = 0
    this.sidebarScore = 0
    this.continuous = 0
    this.setQuiBar()
  }

  async resetOption (e) {
    let { ans } = this.qs
    // 把選項的event listener關掉
    document.getElementsByClassName('quiOption')[0].removeEventListener('click', this.checkAns)
    document.getElementsByClassName('quiOption')[1].removeEventListener('click', this.checkAns)
    document.getElementsByClassName('quiOption')[2].removeEventListener('click', this.checkAns)
    document.getElementsByClassName('quiOption')[3].removeEventListener('click', this.checkAns)
    // qui element
    await (new Promise(r => setTimeout(r, 1*1000)))
    // show ans
    document.getElementsByClassName('quiOption')[0].style.opacity = 0
    document.getElementsByClassName('quiOption')[1].style.opacity = 0
    document.getElementsByClassName('quiOption')[2].style.opacity = 0
    document.getElementsByClassName('quiOption')[3].style.opacity = 0
    document.getElementsByClassName('ans')[0].style.background = 'rgb(64,204,161)'
    document.getElementsByClassName('ans')[0].style.color = 'white'
    document.getElementsByClassName('ans')[0].style.opacity = 1
    if(e)
      document.getElementsByClassName('selected')[0].style.opacity = 1
    await (new Promise(r => setTimeout(r, .5*1000)))
    document.getElementById('quiQuestion').style.opacity = 0
    document.getElementsByClassName('ans')[0].style.opacity = 0
    // 把ans class拿掉 不然下一題會被影響
    document.getElementsByClassName('quiOption')[ans-1].classList.remove('ans')
    if(e){
      e.target.style.opacity = 0
      e.target.classList.remove('selected')
    }
    // 等待一秒進下一題
    window.setTimeout(this.transition, 1000)
  }

  setQuiBar () {
    let numQuestion = data[QUI.level].length
    // 分數條顯示(最大值為1)
    let leftScore = this.sidebarScore / QUI.maxScore

    // let rightScore = this.incorrect / numQuestion
    document.getElementsByClassName('quiBar')[0].pseudoStyle('after', 'height', `${parseInt(leftScore * 100)}%`)
    // document.getElementsByClassName('quiBar')[1].pseudoStyle('after', 'height', `${parseInt(rightScore * 100)}%`)
  }

  setQuestion () {
    // console.log(QUI.level, QUI.qno, QUI.random[QUI.qno])
    this.qs = data[QUI.level][QUI.random[ QUI.qno++ ]]
    let { question, choices, ans } = this.qs
    // set question & options
    document.getElementsByClassName('quiOption')[0].style.background = 'rgb(238, 238, 238)'
    document.getElementsByClassName('quiOption')[1].style.background = 'rgb(238, 238, 238)'
    document.getElementsByClassName('quiOption')[2].style.background = 'rgb(238, 238, 238)'
    document.getElementsByClassName('quiOption')[3].style.background = 'rgb(238, 238, 238)'
    document.getElementsByClassName('quiOption')[0].style.color = '#555'
    document.getElementsByClassName('quiOption')[1].style.color = '#555'
    document.getElementsByClassName('quiOption')[2].style.color = '#555'
    document.getElementsByClassName('quiOption')[3].style.color = '#555'
    document.getElementById('quiQContent').innerHTML = question
    choices.forEach((choice, i) => {
      let ele = document.getElementsByClassName('quiOption')[i]
      ele.innerHTML = choice
      ele.addEventListener('click', this.checkAns, false)
    })

    // 加入ans class 答案顯示綠色
    document.getElementsByClassName('quiOption')[ans-1].classList.add('ans')

    // set time
    let showTime = document.getElementById('quiTimer')
    showTime.innerHTML = this.interval
    if(QUI.length === QUI.qno){
      document.getElementById('quiTitle').innerHTML = '最後一題！！！'
    }
    else{
      document.getElementById('quiTitle').innerHTML = `第 ${QUI.qno} 題`
    }

    if(QUI.qno === 1){
      this.show()
      // show header
      document.getElementById('quiHeader').bindAnimation('getInto',0.5,(e)=>{
        // show timer
        e.bindAnimation('timerLoad',.2,()=>{
          document.getElementById('quiTimer').style.opacity = 1
          // show title
          document.getElementById('quiTitle').style.opacity = 0
          document.getElementById('quiContent').bindAnimation('TitleLoad',.5,(e)=>{
            document.getElementById('quiTitle').style.opacity = 0
            e.bindAnimation('QLoad',.25,(e)=>{
              document.getElementById('quiQuestion').style.opacity = 1
              e.bindAnimation('ALoad',.25,()=>{
                document.getElementById('quiOptions').style.pointerEvents = 'all'
                document.getElementById('quiOptions').style.opacity = 1
                this.timer.countdown(
                  this.interval,
                  (remain) => {
                    showTime.innerHTML = remain
                  },
                  () => {
                    document.getElementsByClassName('quiOption')[ans-1].style.background = 'rgb(64,204,161)'
                    this.resetOption()
                  }
                )
              })
            })
          })
        })
      })
    }
    else{
          // show title
          document.getElementById('quiTitle').style.opacity = 0
          document.getElementById('quiContent').bindAnimation('TitleLoad',.5,(e)=>{
            document.getElementById('quiTitle').style.opacity = 0
            e.bindAnimation('QLoad',.25,(e)=>{
              document.getElementById('quiQuestion').style.opacity = 1
              e.bindAnimation('ALoad',.25,()=>{
                document.getElementById('quiOptions').style.pointerEvents = 'all'
                document.getElementById('quiOptions').style.opacity = 1
                this.timer.countdown(
                  this.interval,
                  (remain) => {
                    showTime.innerHTML = remain
                  },
                  () => {
                    document.getElementsByClassName('quiOption')[ans-1].style.background = 'rgb(64,204,161)'
                    // 更新sideBar分數條
                    this.setQuiBar()
                    this.resetOption()
                  }
                )
              })
            })
          })
    }
  }

  checkAns (e) {
    e.target.classList.add('selected')
    // 點選項後把interval關掉
    this.timer.timeup()
    // 看選對選錯給顏色
    if (e.target.classList.contains('ans')) {
      // Pass
      this.currentScore += Math.round(QUI.score[this.timer.remain] * QUI.bonus[this.continuous])
      this.sidebarScore += Math.round(QUI.score[this.timer.remain] * QUI.sidebarBonus[this.correctNum])

      document.getElementById('showScore').innerHTML = this.currentScore
      console.log(this.continuous)
      document.getElementById('score_bonus').innerHTML = QUI.bonus[this.continuous]
      this.continuous++
      document.getElementById('continuous').innerHTML = this.continuous
      

      this.correctNum++

      e.target.style.background = 'rgb(64,204,161)'
      e.target.style.color = 'white'
      // 更新sideBar分數條
      this.setQuiBar()
      e.target.bindAnimation('click-true',.1,()=>{
        if(this.continuous >= 2){
          // show 連續答對
          document.getElementById('quiCon').style.display ='block'
          document.getElementById('quiCon').bindAnimation('slideIn',.5,async (e)=>{
            await (new Promise(r => setTimeout(r, 500)))
            e.bindAnimation('slideOut',0.2,()=>{
              document.getElementById('quiCon').style.display = 'none'
            })
          })
        }
      })
      
    }
    else {
      // Fail
      this.continuous = 0
      e.target.style.background = 'rgb(223,95,98)'
      e.target.style.color = 'white'
      // 更新sideBar分數條
      this.setQuiBar()
      // 顯示正確答案
      e.target.bindAnimation('click-false',.1)
    }
    this.resetOption(e)
    // console.log(this.currentScore)
  }

  transition () {
    document.getElementById('quiOptions').style.opacity = 0
    document.getElementById('quiOptions').style.pointerEvents = 'none'
    document.getElementsByClassName('quiOption')[0].style.opacity = 1
    document.getElementsByClassName('quiOption')[1].style.opacity = 1
    document.getElementsByClassName('quiOption')[2].style.opacity = 1
    document.getElementsByClassName('quiOption')[3].style.opacity = 1
    if (QUI.qno < QUI.length) {
      this.setQuestion()
    } else {
      // close
      this.clear()
      game.addScore(this.currentScore) // 一個向度結束後更新遊戲總分
      game.currentScore = this.currentScore
      game.over()
    }
  }
}

export default QuiThink
