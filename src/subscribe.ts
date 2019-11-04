import { ValueGetterSubscriber } from "./types"

export function Subscribe<T>(
  subscribableFn: (props: any) => ValueGetterSubscriber<T>,
  getterFn?: () => T
) {
  return function(target: any, key: string) {
    let subscription: any
    const targetComponentDidMount = target.componentDidMount || function() {}
    const targetComponentWillUnmount =
    target.componentWillUnmount || function() {}
    
    function componentDidMount(this: any): void {
      const subscribable = subscribableFn(this.props)
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
      let subscribe: any
      if (typeof subscribable === "function") {
        subscribe = subscribable
      } else {
        subscribe = (cb: any) => subscribable.subscribe!(cb)
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
