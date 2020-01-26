import React from "react"
import { max } from "d3"
import {
  margin,
  getScaleLinear,
  getHistogram,
  dataToVizUrl,
} from "../../common"
import { useCSVData } from "../../hooks"
import { Axis } from "../Axis"

const height = 420
const width = 500

const { top, right, bottom, left } = margin
const x = getScaleLinear({ domain: [0, 1000], range: [0, width] })
const histogram = getHistogram({ x, key: "price", amount: 50 })

export const Histogram = () => {
  const data = useCSVData(dataToVizUrl("1_OneNum.csv"))
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
          {bins
            .filter(({ x0, x1 }) => x(x1) - x(x0) > 0)
            .map(({ x0, x1, length }) => (
              <rect
                key={x0}
                x={1}
                width={x(x1) - x(x0) - 1}
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
