class Webdis {
  tested = false
  url = 'http://127.0.0.1:7379'
  async send(command: string): Promise<any> {
    console.log('command: ', command)
    const response = await fetch(this.url + '/' + this.parseCommand(command))
    const json: object = await response.json()
    console.log('json: ', json)
    return json
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
      this.tested = true
      return this.tested
    } catch (err) {
      this.tested = false
      throw err
    }
  }
}

export const webdis = new Webdis()
