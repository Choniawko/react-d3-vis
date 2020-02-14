import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { getScale } from "common/utils"

const types = {
  left: "axisLeft",
  bottom: "axisBottom",
}

export const useAxis = ({
  type,
  scaleType,
  domain = [0, 0],
  range = [],
  ticks,
  isScalable = false,
}) => {
  const ref = useRef(null)
  const [scale, setScale] = useState(() =>
    getScale({ type: scaleType, domain, range }),
  )
  useEffect(() => {
    setScale(() => getScale({ type: scaleType, domain, range }))
    d3.select(ref.current).call(d3[types[type]](scale).ticks(ticks))
    //eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (
      isScalable &&
      scale.invert(1) !== getScale({ type: scaleType, domain, range }).invert(1)
    ) {
      setScale(() => getScale({ type: scaleType, domain, range }))
      d3.select(ref.current).call(d3[types[type]](scale).ticks(ticks))
    }
    //eslint-disable-next-line
  }, [scaleType, ticks, type, domain, range])

  return { scale, setScale, ref }
}
