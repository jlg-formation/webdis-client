class Webdis {
  tested = this.getTested()
  url = 'http://127.0.0.1:7379'

  constructor() {}

  getTested() {
    const str = localStorage.getItem('tested')
    if (str === null) {
      return false
    }
    return str === 'true'
  }

  setTested(tested: boolean) {
    localStorage.setItem('tested', tested + '')
    this.tested = tested
  }

  parseCommand(command: string) {
    return command.replace(/ /g, '/')
  }

  async ping(): Promise<boolean> {
    try {
      const json: { PING: [true, string] } = await webdis.send('PING')
      const pong = json.PING[1]
      if (pong !== 'PONG') {
        throw new Error('bad value')
      }
      this.setTested(true)
      return this.tested
    } catch (err) {
      this.setTested(false)
      throw err
    }
  }

  async send(command: string): Promise<any> {
    console.log('command: ', command)
    const response = await fetch(this.url + '/' + this.parseCommand(command))
    const json: object = await response.json()
    console.log('json: ', json)
    return json
  }
}

export const webdis = new Webdis()
