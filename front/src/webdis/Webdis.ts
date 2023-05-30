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
}

export const webdis = new Webdis()
