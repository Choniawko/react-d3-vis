import React from "react"
import { entries } from "d3"
import { margin, getPie, getScale, getArc } from "common/utils"

const height = 450
const width = 450
const colorRange = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]
const { top, right, bottom, left } = margin
const radius = Math.min(width, height) / 2 - 40
const arc = getArc(radius)
const data = { a: 9, b: 20, c: 30, d: 8, e: 12 }
const color = getScale({
  type: "ordinal",
  domain: data,
  range: colorRange,
})
const pie = getPie("value")
const pieItems = pie(entries(data))

export const PieChart = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={width + left + right} height={height + top + bottom}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {pieItems.map(el => (
            <path
              key={el.data.key}
              d={arc(el)}
              style={{
                fill: color(el.data.key),
                stroke: "black",
                strokeWidth: "2px",
                opacity: 0.7,
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
