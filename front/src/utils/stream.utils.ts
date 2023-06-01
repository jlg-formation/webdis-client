import type { ConsumerGroup } from '@/stores/stream'
import { webdis } from '../webdis/Webdis'

export interface PendingResume {
  msgs: number
  idmax?: string
  idmin?: string
}

export const getMaxHousekeepingId = async (consumerGroups: ConsumerGroup[]): Promise<string> => {
  if (consumerGroups.length === 0) {
    return '0-0'
  }
  let maxId: string = '0-999999999999'
  for (const consumerGroup of consumerGroups) {
    const consumerGroupMaxId = await getMaxHousekeepingConsumerGroupId(consumerGroup)
    maxId = getMin(consumerGroupMaxId, maxId)
  }
  return maxId
}

export const getMaxHousekeepingConsumerGroupId = async (
  consumerGroup: ConsumerGroup
): Promise<string> => {
  const result: { XPENDING: PendingResume } = await webdis.send(
    `XPENDING mystream ${consumerGroup.name}`
  )
  console.log('result: ', result)
  if (result.XPENDING.msgs === 0) {
    // no pending message
    return consumerGroup.info[7]
  }
  if (result.XPENDING.idmin) {
    const id = +result.XPENDING.idmin.substring(2) - 1
    return '0-' + id
  }
  throw new Error('cannot get the housekeeping max id')
}

export const getMin = (id1: string, id2: string): string => {
  const id1Nbr = +id1.substring(2)
  const id2Nbr = +id2.substring(2)
  return id1Nbr < id2Nbr ? id1 : id2
}
