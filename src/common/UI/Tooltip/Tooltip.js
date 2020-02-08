import React, { useMemo } from "react"

export const Tooltip = ({ top, left, value }) => {
  const style = useMemo(
    () => ({
      position: "absolute",
      backgroundColor: "black",
      color: "white",
      borderRadius: "5px",
      padding: "10px",
      top: `${top}px`,
      left: `${left}px`,
      fontSize: "12px",
    }),
    [left, top],
  )
  return <div {...{ style }}>{value}</div>
}
