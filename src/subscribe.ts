import { Unsubscribable, Subscribable, SubscribableFn } from "./types"

export function Subscribe<T>(
  subscribable: Subscribable<T>,
  getterFn?: () => T
) {
  return function(target: any, key: string) {
    let subscription: Unsubscribable
    const targetComponentDidMount = target.componentDidMount || function() {}
    const targetComponentWillUnmount =
      target.componentWillUnmount || function() {}

    function componentDidMount(this: any): void {
      let defaultValue = this[key]
      if (typeof subscribable !== "function" && subscribable.value) {
        defaultValue = subscribable.value
      }
      if (typeof subscribable !== "function" && subscribable.getValue) {
        defaultValue = subscribable.getValue()
      }
      if (getterFn) {
        defaultValue = getterFn()
      }
      this[key] = defaultValue
      this.forceUpdate()
      let subscribe: SubscribableFn<T>
      if (typeof subscribable === "function") {
        subscribe = subscribable
      } else {
        subscribe = (cb: any, ...args: any[]) =>
          subscribable.subscribe(cb, ...args)
      }
      if (getterFn) {
        subscription = subscribe(() => {
          this[key] = getterFn()
          this.forceUpdate()
        })
      } else {
        subscription = subscribe((value: any) => {
          this[key] = value
          this.forceUpdate()
        })
      }
      targetComponentDidMount.apply(this)
    }

    function componentWillUnmount(this: any): void {
      if (typeof subscription === "function") {
        subscription()
      } else {
        subscription.unsubscribe()
      }
      targetComponentWillUnmount.apply(this)
    }

    target.componentDidMount = componentDidMount
    target.componentWillUnmount = componentWillUnmount
  }
}
