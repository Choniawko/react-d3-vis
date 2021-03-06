import React from "react"
import { extent, line, nest, max } from "d3"
import { margin, getScale, dataToVizUrl } from "common/utils"
import { Axis } from "common/UI"
import { useCSVData } from "../../hooks"

const height = 260
const width = 260
const colors = [
  "#e41a1c",
  "#377eb8",
  "#4daf4a",
  "#984ea3",
  "#ff7f00",
  "#ffff33",
  "#a65628",
  "#f781bf",
  "#999999",
]
const { top, right, bottom, left } = margin

export const LineChart = () => {
  const data = useCSVData(dataToVizUrl("5_OneCatSevNumOrdered.csv"))
  const lineGenerator = line()
  const sumstat = nest()
    .key(({ name }) => name)
    .entries(data)
  const allKeys = sumstat.map(({ key }) => key)
  const x = getScale({
    type: "linear",
    domain: extent(data, ({ year }) => year),
    range: [0, width],
  })
  const y = getScale({
    type: "linear",
    domain: [0, max(data, ({ n }) => +n)],
    range: [height, top],
  })
  const color = getScale({
    type: "ordinal",
    domain: allKeys,
    range: colors,
  })
  return (
    <div style={{ textAlign: "center" }}>
      {sumstat.map(({ values, key }) => (
        <svg
          key={key}
          width={width + left + right}
          height={height + top + bottom}
        >
          <Axis
            scale={x}
            translate={[left, height + top]}
            type="bottom"
            ticks={3}
          />
          <Axis scale={y} translate={[left, top]} type="left" />
          <g transform={`translate(${left}, ${top})`}>
            <text textAnchor="start" y={5} x={0} style={{ fill: color(key) }}>
              {key}
            </text>
            <path
              d={lineGenerator(values.map(({ year, n }) => [x(year), y(+n)]))}
              style={{ fill: "none", stroke: color(key), strokeWidth: 1.5 }}
            />
          </g>
        </svg>
      ))}
    </div>
  )
}
