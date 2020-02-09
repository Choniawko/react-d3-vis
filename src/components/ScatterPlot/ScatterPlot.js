import React from "react"
import { extent, timeParse, line } from "d3"
import { margin, graphGalleryUrl, getScale } from "common/utils"
import { Axis, Brush } from "common/UI"
import { useCSVData } from "../../hooks"

const height = 420
const width = 500
const { top, right, bottom, left } = margin
const y = getScale({ type: "linear", domain: [8000, 9200], range: [height, 0] })

export const ScatterPlot = () => {
  const data = useCSVData(graphGalleryUrl("connectedscatter.csv")).map(
    ({ date, value }) => ({
      date: timeParse("%Y-%m-%d")(date),
      value,
    }),
  )
  const x = getScale({
    type: "time",
    domain: extent(data, ({ date }) => date),
    range: [0, width],
  })
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={width + left + right} height={height + top + bottom}>
        <Brush {...{ width, height }} />
        <Axis scale={x} translate={[left, height + top]} type="bottom" />
        <Axis scale={y} translate={[left, top]} type="left" />
        <g transform={`translate(${left}, ${top})`}>
          <path
            d={line()(data.map(({ date, value }) => [x(date), y(value)]))}
            style={{ fill: "none", stroke: "#69b3a2", strokeWidth: 1.5 }}
          />
          {data.map(({ date, value }) => (
            <circle
              key={value}
              cx={x(date)}
              cy={y(value)}
              r={5}
              style={{ fill: "#69b3a2" }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
