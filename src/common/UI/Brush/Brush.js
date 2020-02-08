import React, { useRef, useEffect } from "react"
import { brushX, select, event } from "d3"

export const Brush = ({ width, height }) => {
  const ref = useRef(null)
  useEffect(() => {
    select(ref.current).call(
      brushX().on("end", () => {
        const { selection } = event
        console.log(selection)
      }),
    )
  }, [height, width])
  return <g {...{ ref }} />
}
