import React from "react"
import { margin, getScale, dataToVizUrl } from "common/utils"
import { Axis, Tooltip } from "common/UI"
import { useTooltip } from "common/hooks"

import { useCSVData } from "../../hooks"

const height = 420
const width = 500
const { top, right, bottom, left } = margin

const x = getScale({ type: "linear", domain: [0, 10000], range: [0, width] })
const y = getScale({ type: "linear", domain: [35, 90], range: [height, 0] })
const z = getScale({
  type: "linear",
  domain: [200000, 1310000000],
  range: [1, 40],
})

export const BubblePlot = () => {
  const data = useCSVData(dataToVizUrl("4_ThreeNum.csv"))
  const {
    visibled,
    position: [positionLeft, positionTop],
    value,
    handleShow,
    handleHide,
    handleMove,
  } = useTooltip()
  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <svg width={width + left + right} height={height + top + bottom}>
        <Axis scale={x} translate={[left, height + top]} type="bottom" />
        <Axis scale={y} translate={[left, top]} type="left" />
        <g transform={`translate(${left}, ${top})`}>
          {data.map(({ gdpPercap, lifeExp, pop, country }) => (
            <circle
              onMouseMove={handleShow}
              onMouseLeave={handleHide}
              onMouseOver={handleMove(country)}
              key={gdpPercap}
              cx={x(gdpPercap)}
              cy={y(lifeExp)}
              r={z(pop)}
              style={{ fill: "#69b3a2", opacity: "0.7", stroke: "black" }}
            />
          ))}
        </g>
      </svg>
      {visibled && (
        <Tooltip left={positionLeft} top={positionTop} {...{ value }} />
      )}
    </div>
  )
}
