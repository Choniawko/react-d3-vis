import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { getScale } from "common/utils"

const types = {
  left: "axisLeft",
  bottom: "axisBottom",
}

export const useAxis = ({ type, domain, range, ticks }) => {
  const ref = useRef(null)
  const scale = getScale({ type, domain, range })
  useEffect(() => {
    d3.select(ref.current).call(d3[types[type]](scale).ticks(ticks))
  }, [scale, ticks, type])
  return { scale, ref }
}
