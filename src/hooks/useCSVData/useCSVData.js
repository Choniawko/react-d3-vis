import { useState, useEffect } from "react"
import { csv } from "d3"

export const useCSVData = url => {
  const [data, setData] = useState([])
  useEffect(() => {
    csv(url).then(setData)
  }, [url])
  return data
}
