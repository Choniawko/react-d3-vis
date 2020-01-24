import React from "react"
import { max } from "d3"
import { margin, getScaleLinear, getHistogram, baseUrl } from "../../common"
import { useCSVData } from "../../hooks"
import { Axis } from "../Axis"

const height = 420
const width = 500

export const Histogram = () => {
  const { top, right, bottom, left } = margin
  const data = useCSVData(baseUrl("1_OneNum.csv"))
  const x = getScaleLinear({ domain: [0, 1000], range: [0, width] })
  const histogram = getHistogram({ x, key: "price", amount: 50 })
  const bins = histogram(data)
  const y = getScaleLinear({
    domain: [0, max(bins, ({ length }) => length)],
    range: [height, 0],
  })
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={width + left + right} height={height + top + bottom}>
        <Axis scale={x} translate={[left, height + top]} type="bottom" />
        <Axis scale={y} translate={[left, top]} type="left" />
        <g transform={`translate(${left}, ${top})`}>
          {bins.map(({ x0, x1, length }) => (
            <rect
              key={x0}
              x={1}
              width={x(x1) - x(x0)}
              height={height - y(length)}
              transform={`translate(${x(x0)}, ${y(length)})`}
              style={{ fill: x0 < 140 ? "orange" : "#69b3a2" }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
