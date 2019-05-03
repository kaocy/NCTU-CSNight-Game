import Timer from 'timer'
import {data, QUI} from './assets/resources/quithink'
import {game} from 'main'

class QuiThink {
  constructor (interval = 10) {
    this.interval = interval // parameters
    this.show = this.show.bind(this)
    this.setQuestion = this.setQuestion.bind(this)
    this.clear = this.clear.bind(this)
    this.timer = new Timer() // new a timer
  }
  show () {
    let {height, top} = document.getElementById('quiOptions').getBoundingClientRect()
    document.getElementById('quiBarContainer').style.top = `${top}px`
    document.getElementById('quiBarContainer').style.height = `${height}px`
    document.getElementById('quickThink').style.opacity = 1
    document.getElementById('quickThink').style.zIndex = 1080
  }

  setQuestion (qs) {
    let {question, choices, ans} = qs
    console.log(qs)
    // set question & options
    document.getElementsByClassName('quiOption')[0].style.background = 'rgb(238, 238, 238)'
    document.getElementsByClassName('quiOption')[1].style.background = 'rgb(238, 238, 238)'
    document.getElementsByClassName('quiOption')[2].style.background = 'rgb(238, 238, 238)'
    document.getElementsByClassName('quiOption')[3].style.background = 'rgb(238, 238, 238)'
    const transition = () => {
      if (QUI.frame < data[QUI.sheet].length) {
        game.QuiThink.setQuestion(data[QUI.sheet][QUI.frame])
        QUI.frame++
      } else {
        // close
        this.clear()
      }
    }
    const checkAns = (e) => {
      this.timer.timeup()
      if (e.target.classList.length === 2) {
        // Pass
        e.target.style.background = 'rgb(64,204,161)'
      } else {
        // Fail
        e.target.style.background = 'rgb(223,95,98)'
      }
      document.getElementsByClassName('quiOption')[0].removeEventListener('click', checkAns)
      document.getElementsByClassName('quiOption')[1].removeEventListener('click', checkAns)
      document.getElementsByClassName('quiOption')[2].removeEventListener('click', checkAns)
      document.getElementsByClassName('quiOption')[3].removeEventListener('click', checkAns)
      // 等待一秒進下一題
      setTimeout(transition, 1000)
    }
    // console.log(q)
    document.getElementById('quiQuestion').innerHTML = question
    choices.forEach(
      (choice, i) => {
        let ele = document.getElementsByClassName('quiOption')[i]
        if (i === ans) {
          ele.classList.add('ans')
        }
        ele.innerHTML = choice
        ele.addEventListener('click', checkAns, false)
      }
    )
    // set time
    let showTime = document.getElementById('quiTimer')
    showTime.innerHTML = this.interval

    this.timer.countdown(this.interval,
      () => {
        document.getElementsByClassName('quiOption')[ans].style.background = 'rgb(64,204,161)'
        setTimeout(transition, 1000)
      },
      (remain) => { showTime.innerHTML = remain }
    )
    this.show()
  }
  clear () {
    document.getElementById('quickThink').style.opacity = 0
    document.getElementById('quickThink').style.zIndex = 0
  }
}

export default QuiThink
