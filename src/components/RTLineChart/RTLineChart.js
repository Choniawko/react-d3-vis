import React, { useState } from "react"
import { line } from "d3"
import { useSocket } from "use-socketio"

import { margin, getScaleLinear } from "../../common"
import { Axis } from "../Axis"

const height = 420
const width = 500
const maxDomain = 100
const { top, right, bottom, left } = margin

export const RTLineChart = () => {
  const [items, setItem] = useState([])
  const x = getScaleLinear({
    domain: [0, maxDomain],
    range: [0, width],
  })
  const y = getScaleLinear({
    domain: [0, maxDomain],
    range: [height, top],
  })
  const updateItems = newItem =>
    items.length < maxDomain
      ? [...items, [x(items.length), y(newItem)]]
      : items.reduce(
          (acc, curr, i, arr) =>
            i < maxDomain - 1
              ? [...acc.slice(0, i), [curr[0], arr[i + 1][1]], ...acc.slice(i)]
              : [...acc.slice(0, i), [curr[0], y(newItem)]],
          items,
        )
  useSocket("value", newItem => setItem(updateItems(newItem)))
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
