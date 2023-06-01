export const getNextCounter = (names: string[]) => {
  let result = 0
  for (const name of names) {
    const nbr = +name.replace(/^.*-(\d+)$/, '$1')
    if (nbr > result) {
      result = nbr
    }
  }
  result++
  return result
}
