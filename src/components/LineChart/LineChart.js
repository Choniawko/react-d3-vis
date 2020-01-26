import React from "react"
import { extent, line, nest, max } from "d3"
import {
  margin,
  getScaleLinear,
  getScaleOrdinal,
  dataToVizUrl,
} from "../../common"
import { useCSVData } from "../../hooks"
import { Axis } from "../Axis"

const height = 420
const width = 500
const { top, right, bottom, left } = margin

export const LineChart = () => {
  const data = useCSVData(dataToVizUrl("5_OneCatSevNumOrdered.csv"))
  const sumstat = nest()
    .key(({ name }) => name)
    .entries(data)
  const allKeys = sumstat.map(({ key }) => key)
  const x = getScaleLinear({
    domain: extent(data, ({ year }) => year),
    range: [0, width],
  })
  const y = getScaleLinear({
    domain: [0, max(data, ({ n }) => +n)],
    range: [height, 0],
  })
  const color = getScaleOrdinal({
    domain: allKeys,
    range: [
      "#e41a1c",
      "#377eb8",
      "#4daf4a",
      "#984ea3",
      "#ff7f00",
      "#ffff33",
      "#a65628",
      "#f781bf",
      "#999999",
    ],
  })
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={width + left + right} height={height + top + bottom}>
        <Axis
          scale={x}
          translate={[left, height + top]}
          type="bottom"
          ticks={3}
        />
        <Axis scale={y} translate={[left, top]} type="left" />
        <g transform={`translate(${left}, ${top})`}>
          {sumstat.map(({ values, key }) =>
            values.map(d => (
              <path
                key={d.prop}
                d={line()(values.map(({ year, n }) => [x(year), y(+n)]))}
                style={{ fill: "none", stroke: color(key), strokeWidth: 1.5 }}
              />
            )),
          )}
        </g>
      </svg>
    </div>
  )
}
