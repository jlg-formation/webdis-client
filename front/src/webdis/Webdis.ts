class Webdis {
  tested = false
  url = 'http://127.0.0.1:7379'
  async send(...args: string[]): Promise<any> {
    const response = await fetch(this.url + '/' + this.parseCommand(...args))
    const json: object = await response.json()
    console.log('json: ', json)
    return json
  }
  parseCommand(...args: string[]) {
    return args.join('/')
  }
}

export const webdis = new Webdis()
