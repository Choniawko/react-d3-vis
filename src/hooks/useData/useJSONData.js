import { useState, useEffect } from "react"
import { json } from "d3"

export const useJSONData = url => {
  const [data, setData] = useState([])
  useEffect(() => {
    json(url).then(res => {
      setData({
        ...res,
        features: res.features.map(item => ({
          ...item,
          opacity: 1,
          stroke: "transparent",
        })),
      })
    })
  }, [url])
  return {
    data,
    setData,
  }
}
