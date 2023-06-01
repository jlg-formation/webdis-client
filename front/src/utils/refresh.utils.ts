import { webdis } from '@/webdis/Webdis'

export const isStreamExisting = async (name: string) => {
  const result: { TYPE: [boolean, string] } = await webdis.send(`TYPE ${name}`)
  console.log('result: ', result)
  return result.TYPE[1] === 'stream'
}
