import React, { useState } from "react"
import { line } from "d3"
import { useSocket } from "use-socketio"

import { margin, getScaleLinear } from "../../common"
import { Axis } from "../Axis"

const height = 420
const width = 500
const { top, right, bottom, left } = margin

export const RTLineChart = () => {
  const [items, setItem] = useState([])
  const x = getScaleLinear({
    domain: [0, 100],
    range: [0, width],
  })
  const y = getScaleLinear({
    domain: [0, 100],
    range: [height, top],
  })
  useSocket("value", newItem =>
    setItem(
      items.length < 100
        ? [...items, [x(items.length), y(newItem)]]
        : [...items.filter((_, i) => i !== 0), [x(items.length), y(newItem)]],
    ),
  )
  console.log(
    items,
    items.map(el => [x(items.length), y(el)]),
  )
  return (
    <svg width={width + left + right} height={height + top + bottom}>
      <Axis
        scale={x}
        translate={[left, height + top]}
        type="bottom"
        ticks={3}
      />
      <Axis scale={y} translate={[left, top]} type="left" />
      <g transform={`translate(${left}, ${top})`}>
        <path
          d={line()(items)}
          style={{ fill: "none", stroke: "#69b3a2", strokeWidth: 1.5 }}
        />
      </g>
    </svg>
  )
}
