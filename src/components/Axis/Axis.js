import React, { useRef, useEffect } from "react"
import * as d3 from "d3"

const types = {
  left: "axisLeft",
  bottom: "axisBottom",
}

export const Axis = ({ scale, translate: [left = 0, top = 0], type }) => {
  const ref = useRef(null)
  useEffect(() => {
    d3.select(ref.current).call(d3[types[type]](scale))
  }, [scale, type])
  return <g transform={`translate(${left},${top})`} {...{ ref }} />
}
