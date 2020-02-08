import React from "react"
import { margin, getScaleLinear, dataToVizUrl } from "common/utils"
import { Axis } from "common/UI"
import { useCSVData } from "../../hooks"

const height = 420
const width = 500

const { top, right, bottom, left } = margin
const x = getScaleLinear({ domain: [0, 10000], range: [0, width] })
const y = getScaleLinear({ domain: [35, 90], range: [height, 0] })
const z = getScaleLinear({ domain: [200000, 1310000000], range: [1, 40] })

export const BubblePlot = () => {
  const data = useCSVData(dataToVizUrl("4_ThreeNum.csv"))
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={width + left + right} height={height + top + bottom}>
        <Axis scale={x} translate={[left, height + top]} type="bottom" />
        <Axis scale={y} translate={[left, top]} type="left" />
        <g transform={`translate(${left}, ${top})`}>
          {data.map(({ gdpPercap, lifeExp, pop }) => (
            <circle
              key={gdpPercap}
              cx={x(gdpPercap)}
              cy={y(lifeExp)}
              r={z(pop)}
              style={{ fill: "#69b3a2", opacity: "0.7", stroke: "black" }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
