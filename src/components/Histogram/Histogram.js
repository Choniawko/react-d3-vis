import React, { useState } from "react"
import { max } from "d3"
import { margin, getScale, getHistogram, dataToVizUrl } from "common/utils"
import { Tooltip, Axis } from "common/UI"
import { useTooltip } from "common/hooks"
import { useCSVData } from "../../hooks"

const height = 420
const width = 500

const { top, right, bottom, left } = margin
const x = getScale({ type: "linear", domain: [0, 1000], range: [0, width] })

export const Histogram = () => {
  const data = useCSVData(dataToVizUrl("1_OneNum.csv"))
  const {
    visibled,
    position: [positionLeft, positionTop],
    value,
    handleShow,
    handleHide,
    handleMove,
  } = useTooltip()
  const [binAmount, setBinAmount] = useState(40)
  const histogram = getHistogram({ x, key: "price", amount: binAmount })
  const bins = histogram(data)
  const y = getScale({
    type: "linear",
    domain: [0, max(bins, ({ length }) => length)],
    range: [height, 0],
  })
  const handleSubmit = e => {
    e.preventDefault()
    const {
      target: {
        elements: { binsAmount },
      },
    } = e
    binsAmount.value && setBinAmount(binsAmount.value)
  }

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <svg width={width + left + right} height={height + top + bottom}>
        <Axis scale={x} translate={[left, height + top]} type="bottom" />
        <Axis scale={y} translate={[left, top]} type="left" />
        <g transform={`translate(${left}, ${top})`}>
          {bins
            .filter(({ x0, x1 }) => x(x1) - x(x0) > 0)
            .map(({ x0, x1, length }) => (
              <rect
                onMouseMove={handleShow}
                onMouseLeave={handleHide}
                onMouseOver={handleMove(`Range: ${x0} - ${x1}`)}
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
      {visibled && (
        <Tooltip left={positionLeft} top={positionTop} {...{ value }} />
      )}
      <form onSubmit={handleSubmit}>
        <label>Bins: </label>
        <input min="1" type="number" name="binsAmount" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
