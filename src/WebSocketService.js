export default class WebSocketService extends EventTarget {
  constructor(address) {
    super()
    this.address = address
    this.recovery = false
    this.handlersList = []
  }

  start() {
    try {
      this.ws = new WebSocket("ws://" + this.address.replace('http://', ''))
    } catch (err) {
      console.log(err)
    }
    this.ws.onopen = () => {
      this.recovery = false
      console.log('%c > WebSocketService: opened ', 'background: black; color: #00ff00; font-size: 1.1em')
      this.dispatchEvent(new CustomEvent('connectionUpdated', { detail: true }))
    }

    this.ws.onmessage = (event) => {
      let parsed = JSON.parse(event.data)
      this.dispatchEvent(new CustomEvent(
        parsed['responseType'], { detail: parsed['data'] })
      )
    }

    this.ws.onclose = () => {
      if (!this.recovery) {
        console.log('%c > WebSocketService: closed ', 'background: black; color: #00ff00; font-size: 1.1em')
        this.dispatchEvent(new CustomEvent('connectionUpdated', { detail: false }))
      }
      this.recovery = true
      setTimeout(this.start.bind(this), 1000)
    }
  }

  on(event, identifier, handler) {
    let filterRes = this.handlersList.filter(h => h.identifier === identifier)
    //console.log(filterRes)
    if (filterRes.length === 0) {
      this.handlersList.push({
        identifier,
        event,
        handler
      })
      this.addEventListener(event, e => {
        //console.log(e)
        handler(e)
      })
    }
  }

  changeAddress(address) {
    this.address = address
  }

  send(command, args = {}) {
    if (this.ws.readyState) {
      this.ws.send(JSON.stringify({command, args}))
    }
  }
}
