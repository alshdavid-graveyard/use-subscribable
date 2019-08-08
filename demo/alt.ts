export const randomString = () => 
  Math.random().toString(36).substring(7)

export type callback<T = any> = (value: T) => void

export interface Subscription {
  unsubscribe: () => void 
}

export class ObserverWithState<T = any> {
  subscribers: Record<string, callback<T>> = {}
  state: T

  constructor(state: T) {
    this.state = state
  }

  subscribe(cb: callback<T>) {
    const key = randomString()
    this.subscribers[key] = cb
    cb(this.state)
    return () => delete this.subscribers[key]
  }

  next(value: T) {
    this.state = value
    for (const key in this.subscribers) {
      this.subscribers[key](this.state)
    }
  }
}

let i = 0
export const altCounter = new ObserverWithState(i)
setInterval(() => {
  i++
  altCounter.next(i)
}, 1000)
