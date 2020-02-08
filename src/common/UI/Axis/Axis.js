import React, { useRef, useEffect } from "react"
import * as d3 from "d3"

const types = {
  left: "axisLeft",
  bottom: "axisBottom",
}

export const Axis = ({
  scale,
  translate: [left = 0, top = 0],
  type,
  ticks,
}) => {
  const ref = useRef(null)
  useEffect(() => {
    d3.select(ref.current).call(d3[types[type]](scale).ticks(ticks))
  }, [scale, type, ticks])
  return <g transform={`translate(${left},${top})`} {...{ ref }} />
}
