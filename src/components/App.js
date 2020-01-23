import React from "react"
import { margin, getScaleLinear } from "../common"
import { useCSVData } from "../hooks"
import { Axis } from "./Axis"

const height = 420
const width = 500
const url =
  "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv"

function App() {
  const { top, right, bottom, left } = margin
  const { data } = useCSVData(url)
  const x = getScaleLinear([0, 10000], [0, width])
  const y = getScaleLinear([35, 90], [height, 0])
  const z = getScaleLinear([200000, 1310000000], [1, 40])
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={width + left + right} height={height + top + bottom}>
        <Axis scale={x} translate={[left, height + top]} type="bottom" />
        <Axis scale={y} translate={[left, top]} type="left" />
        <g transform={`translate(${left}, ${top})`}>
          {data.map((dot, i) => (
            <circle
              key={i}
              cx={x(dot.gdpPercap)}
              cy={y(dot.lifeExp)}
              r={z(dot.pop)}
              style={{ fill: "#69b3a2", opacity: "0.7", stroke: "black" }}
            ></circle>
          ))}
        </g>
      </svg>
    </div>
  )
}

export default App
