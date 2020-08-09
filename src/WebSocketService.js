export default class WebSocketService extends EventTarget {
  constructor(address) {
    super()
    /* Set address */
    this.addressLocalStorageKey = 'WR_UI_SERVER_ADDRESS'
    this.address = address
    let lsAddress = window.localStorage.getItem(this.addressLocalStorageKey)
    if (lsAddress != null) { this.address = lsAddress}

    /* Set identifier */
    this.identifierLocalStorageKey = 'WR_UI_CLIENT_IDENTIFIER'
    this.identifier = 'default_' + Date.now().toString()
    let lsIdentifier = window.localStorage.getItem(this.identifierLocalStorageKey)
    if (lsIdentifier != null && lsIdentifier != 'null') { this.identifier = lsIdentifier } else {
      window.localStorage.setItem(this.identifierLocalStorageKey, this.identifier)
    }

    /* Various other things */
    this.recovery = false
    this.isConnected = false
    this.handlersList = []
    this.toSend = []
  }

  start() {
    //console.log(this.isConnected)
    let addr = 'ws://' + this.address.replace('http://', '')
    addr += "?identifier=" + this.identifier
    if (this.isConnected) {
      this.recovery = false
      return
    }
    try {
      this.ws = new WebSocket(addr)
    } catch (err) {
      console.log(err)
    }
    this.ws.onopen = () => {
      this.isConnected = true
      console.log(
        '%c > WebSocketService: opened (id: ' + this.identifier +')',
        'background: black; color: #00ff00; font-size: 1.1em'
      )
      this.dispatchEvent(new CustomEvent('connectionUpdated', { detail: true }))
      this.toSend.forEach(value => {
        this.send(value[0], value[1])
      })
      this.toSend = []
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
      this.isConnected = false
      this.recovery = true
      setTimeout(this.start.bind(this), 1000)
    }
  }

  on(event, identifier, handler) {
    if (this.isConnected) {
      this.send('sub', { topic: event })
    } else {
      this.toSend.push(['sub', { topic: event }])
    }
    let filterRes = this.handlersList.filter(h => h.identifier === identifier)
    //console.log(filterRes)
    let realHandler = e => {
      //console.log(e)
      handler(e)
    }
    if (filterRes.length === 0) {
      this.handlersList.push({
        identifier,
        event,
        realHandler
      })
    } else {
      this.removeEventListener(event, filterRes[0].realHandler)
      this.handlersList = this.handlersList.map((h) => {
        if (h.identifier === identifier) {
          h.realHandler = realHandler
        }
        return h
      })
    }
    this.addEventListener(event, realHandler)
  }

  changeAddress(address) {
    this.address = address
    window.localStorage.setItem(this.addressLocalStorageKey, this.address)
    this.start()
  }

  getAddress() {
    return this.address
  }

  changeIdentifier(identifier) {
    this.identifier = identifier
    window.localStorage.setItem(this.identifierLocalStorageKey, this.address)
    this.start()
  }

  getIdentifier() {
    return this.identifier
  }

  send(command, args = {}) {
    if (this.ws.readyState) {
      this.ws.send(JSON.stringify({command, args}))
    }
  }

}
