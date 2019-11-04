import React from "react";
import { altCounter } from './alt'
import { useSubscribe } from "../src";
import { Observable } from "rxjs";

interface AppAProps {
  counter: Observable<number>
  altCounter: typeof altCounter
}

export const AppA = ({ counter, altCounter }: AppAProps) => {
  const count = useSubscribe(counter)
  const altCount = useSubscribe(altCounter)

  return <div>
    <b>Function Based</b> <br/>   
    Count: {count}<br/>
    AltCount: {altCount}
  </div>
}