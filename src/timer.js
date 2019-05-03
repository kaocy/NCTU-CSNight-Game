
class Timer {
  constructor () {
    this.countdown = this.countdown.bind(this)
    this.timeup = this.timeup.bind(this)
    this.remain = 0
  }
  countdown (sec, doneFn, CountFn) {
    this.remain = sec
    this.timer = setInterval(
      () => {
        this.remain--
        CountFn(this.remain)
        if (this.remain === 0) {
          this.timeup()
          doneFn()
        }
      }, 1000)
  }
  timeup () {
    clearInterval(this.timer)
  }
}

export default Timer
