import React from "react"
import { margin, getScaleLinear, baseUrl } from "../../common"
import { useCSVData } from "../../hooks"
import { Axis } from "../Axis"

const height = 420
const width = 500

export const BubblePlot = () => {
  const { top, right, bottom, left } = margin
  const bubble = useCSVData(baseUrl("4_ThreeNum.csv"))
  const x = getScaleLinear({ domain: [0, 10000], range: [0, width] })
  const y = getScaleLinear({ domain: [35, 90], range: [height, 0] })
  const z = getScaleLinear({ domain: [200000, 1310000000], range: [1, 40] })
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={width + left + right} height={height + top + bottom}>
        <Axis scale={x} translate={[left, height + top]} type="bottom" />
        <Axis scale={y} translate={[left, top]} type="left" />
        <g transform={`translate(${left}, ${top})`}>
          {bubble.map(({ gdpPercap, lifeExp, pop }) => (
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
