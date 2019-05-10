
class Timer {
  constructor () {
    this.remain = 0 // remain time
    this.countdown = this.countdown.bind(this)
    this.timeup = this.timeup.bind(this)
  }

  countdown (sec, doneFn, countFn) {
    this.remain = sec
    this.timer = window.setInterval(() => {
      this.remain--
      countFn(this.remain)
      if (this.remain === 0) {
        this.timeup()
        doneFn()
      }
    }, 1000)
  }

  timeup () {
    window.clearInterval(this.timer)
  }
}

export default Timer
