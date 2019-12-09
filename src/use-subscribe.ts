import { useState, useEffect } from "react";
import { ValueGetterSubscriber, SubscriberFunc, UnsubscriberFunc, Unsubscriber } from './types'
import { getFirstValueSync } from '~/platform/reactive'

export const useSubscribe = <T = any>(
  subscribable: ValueGetterSubscriber<T>, 
  defaultValue?: T,
  getterFn?: () => T
): T => { 
  if (
    typeof subscribable !== "function" && 
    subscribable.value
  ) {
    defaultValue = subscribable.value
  } else if (
    typeof subscribable !== "function" &&
    subscribable.getValue
  ) {
    defaultValue = subscribable.getValue()
  } else if (getterFn) {
    defaultValue = getterFn()
  } else {
    defaultValue = getFirstValueSync(subscribable as any)
  }
  const [ value, setValue ] = useState(defaultValue);

  useEffect(() => {
    let subscribe: SubscriberFunc<T> | undefined
    if (typeof subscribable === "function") {
      subscribe = subscribable
    }
    if (subscribable.subscribe !== undefined) {
      subscribe = (cb: any) => subscribable.subscribe!(cb)
    }
    if (!subscribe) {
      throw new Error('NoSubscribeFunction')
    }
    let subscription: UnsubscriberFunc | Unsubscriber
    if (getterFn) {
      subscription = subscribe(() => setValue(getterFn()));
    } else {
      subscription = subscribe(setValue);
    }
    return () => {
      if (typeof subscription === "function") {
        subscription()
      } else {
        subscription.unsubscribe()
      }
    }
  }, [ subscribable ]);

  return value as T;
};
