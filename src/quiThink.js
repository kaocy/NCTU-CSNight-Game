
import Timer from 'timer'
import { game } from 'main'
import { QUI, data } from './assets/resources/question'

class QuiThink {
  constructor (interval = 8) {
    this.interval = interval // 一題的時間
    this.currentScore = 0    // 一個向度的總分
    this.continue = 0        // 連續答對題數
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
    let { height, top } = document.getElementById('quiOptions').getBoundingClientRect()
    document.getElementById('quiBarContainer').style.top = `${top}px`
    document.getElementById('quiBarContainer').style.height = `${height}px`
    document.getElementById('quickThink').style.opacity = 1
    document.getElementById('quickThink').style.zIndex = 1080
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
    this.currentScore = 0
    this.continue = 0
    this.setQuiBar()
  }

  resetOption () {
    let { ans } = this.qs

    // 把ans class拿掉 不然下一題會被影響
    document.getElementsByClassName('quiOption')[ans-1].classList.remove('ans')

    // 把選項的event listener關掉
    document.getElementsByClassName('quiOption')[0].removeEventListener('click', this.checkAns)
    document.getElementsByClassName('quiOption')[1].removeEventListener('click', this.checkAns)
    document.getElementsByClassName('quiOption')[2].removeEventListener('click', this.checkAns)
    document.getElementsByClassName('quiOption')[3].removeEventListener('click', this.checkAns)

    // 更新sideBar分數條
    this.setQuiBar()

    // 等待一秒進下一題
    window.setTimeout(this.transition, 1000)
  }

  setQuiBar () {
    let numQuestion = data[QUI.level].length
    // 分數條顯示(最大值為1)
    let leftScore = this.currentScore / QUI.maxScore
    // let rightScore = this.incorrect / numQuestion
    document.getElementsByClassName('quiBar')[0].pseudoStyle('after', 'height', `${parseInt(leftScore * 100)}%`)
    // document.getElementsByClassName('quiBar')[1].pseudoStyle('after', 'height', `${parseInt(rightScore * 100)}%`)
  }

  setQuestion () {
    console.log(QUI.level, QUI.qno, QUI.random[QUI.qno])
    this.qs = data[QUI.level][QUI.random[ QUI.qno++ ]]
    let { question, choices, ans } = this.qs
    // set question & options
    document.getElementsByClassName('quiOption')[0].style.background = 'rgb(238, 238, 238)'
    document.getElementsByClassName('quiOption')[1].style.background = 'rgb(238, 238, 238)'
    document.getElementsByClassName('quiOption')[2].style.background = 'rgb(238, 238, 238)'
    document.getElementsByClassName('quiOption')[3].style.background = 'rgb(238, 238, 238)'

    document.getElementById('quiQuestion').innerHTML = question
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
    this.show()
  }

  checkAns (e) {
    // 點選項後把interval關掉
    this.timer.timeup()

    let { ans } = this.qs

    // 看選對選錯給顏色
    if (e.target.classList.contains('ans')) {
      // Pass
      this.currentScore += QUI.score[this.timer.remain] * QUI.bonus[this.continue]
      this.continue++
      e.target.style.background = 'rgb(64,204,161)'
    } else {
      // Fail
      this.continue = 0
      e.target.style.background = 'rgb(223,95,98)'
      // 顯示正確答案
      document.getElementsByClassName('quiOption')[ans-1].style.background = 'rgb(64,204,161)'
    }
    this.resetOption()
    // console.log(this.currentScore)
  }

  transition () {
    if (QUI.qno < QUI.length) {
      this.setQuestion()
    } else {
      // close
      this.clear()
      game.addScore(this.currentScore) // 一個向度結束後更新遊戲總分
      game.over()
    }
  }
}

export default QuiThink
