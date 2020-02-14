import React, { useEffect, useRef, useState } from "react"
import { event, zoom, select } from "d3"
import { margin, getScale, dataToVizUrl } from "common/utils"
import { Tooltip, useAxis } from "common/UI"
import { useTooltip } from "common/hooks"
import { useCSVData } from "../../hooks"

const height = 420
const width = 500
const { top, right, bottom, left } = margin

export const BubblePlot = () => {
  const ref = useRef(null)
  const [transform, setTransform] = useState()
  const { scale: x, ref: refX, setScale: setScaleX } = useAxis({
    type: "bottom",
    scaleType: "linear",
    domain: [0, 10000],
    range: [0, width],
  })
  const { scale: y, ref: refY, setScale: setScaleY } = useAxis({
    type: "left",
    scaleType: "linear",
    domain: [35, 90],
    range: [height, 0],
  })
  const z = getScale({
    type: "linear",
    domain: [200000, 1310000000],
    range: [1, 40],
  })
  const data = useCSVData(dataToVizUrl("4_ThreeNum.csv"))
  const {
    visibled,
    position: [positionLeft, positionTop],
    value,
    handleShow,
    handleHide,
    handleMove,
  } = useTooltip()
  useEffect(() => {
    select(ref.current).call(
      zoom()
        .scaleExtent([0.5, 20])
        .extent([
          [0, 0],
          [width, height],
        ])
        .on("zoom", () => {
          setTransform(event.transform)
          setScaleY(() => event.transform.rescaleY(y))
          setScaleX(() => event.transform.rescaleX(x))
        }),
    )
  }, [setScaleX, setScaleY, x, y])
  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <svg
        width={width + left + right}
        height={height + top + bottom}
        {...{ ref }}
      >
        <g transform={`translate(${left},${height + top})`} ref={refX} />
        <g transform={`translate(${left},${top})`} ref={refY} />
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
              {...{ ref, transform }}
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
