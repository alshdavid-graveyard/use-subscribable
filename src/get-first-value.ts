export const getFirstValueSync = (t: any<T>): any => {
  let r: any
  const s = t.subscribe(v => r = v)
  s.unsubscribe()
  return r
}
