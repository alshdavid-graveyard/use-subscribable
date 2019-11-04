export type UnsubscriberFunc = () => void

export interface Unsubscriber {
  unsubscribe: UnsubscriberFunc
}

export type SubscriberFunc<T> = (cb: (value: T) => void) => Unsubscriber | UnsubscriberFunc

export interface Subscriber<T> {
  subscribe: SubscriberFunc<T>
}

export interface ValueGetter<T> {
  getValue: () => T
}

export type ValueAccessor<T> = {
  value: T
}

export type ValueGetterSubscriber<T> = (
  Partial<Subscriber<T>> &
  Partial<ValueGetter<T>> &
  Partial<ValueAccessor<T>>
)
