import React from "react"
import { geoPath, geoNaturalEarth1, schemeBlues } from "d3"
import { margin, graphGalleryUrl, getColorScale } from "common/utils"
import { useJSONData, useCSVData } from "../../hooks"

const height = 420
const width = 500

const { top, right, bottom, left } = margin

const projection = geoNaturalEarth1()
  .scale(width / 1.3 / Math.PI)
  .translate([width / 2, height / 2])

export const Geo = () => {
  const { data, setData } = useJSONData(graphGalleryUrl("world.geojson"))
  const topo = useCSVData(graphGalleryUrl("world_population.csv"))
  const population = topo.reduce(
    (acc, { code, pop }) => ({
      ...acc,
      [code]: pop,
    }),
    {},
  )
  const colorScale = getColorScale({
    domain: [100000, 1000000, 10000000, 30000000, 100000000, 500000000],
    range: schemeBlues[7],
  })
  const handleMouseOver = d => () => {
    setData({
      ...data,
      features: data.features.map(item => ({
        ...item,
        opacity: item.id === d.id ? 1 : 0.5,
        stroke: item.id === d.id ? "black" : item.stroke,
      })),
    })
  }
  const handleMouseLeave = d => () => {
    setData({
      ...data,
      features: data.features.map(item => ({
        ...item,
        opacity: item.id === d.id ? item.opacity : 1,
        stroke: item.id === d.id ? "transparent" : item.stroke,
      })),
    })
  }
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={width + left + right} height={height + top + bottom}>
        {data.features?.map(d => (
          <path
            key={d.id}
            d={geoPath().projection(projection)(d)}
            opacity={d.opacity}
            onMouseOver={handleMouseOver(d)}
            onMouseLeave={handleMouseLeave(d)}
            style={{
              fill: colorScale(population[d.id] || 0),
              stroke: d.stroke,
              transition: "opacity .5s, stroke 1s",
            }}
          />
        ))}
      </svg>
    </div>
  )
}
