import * as d3 from "d3"

const types = {
  linear: "scaleLinear",
  ordinal: "scaleOrdinal",
  time: "scaleTime",
  threshold: "scaleThreshold",
}

export const getScale = ({ type, domain, range }) =>
  d3[types[type]]()
    .domain(domain)
    .range(range)

export const getHistogram = ({ x, key, amount }) =>
  d3
    .histogram()
    .value(d => d[key])
    .domain(x.domain())
    .thresholds(x.ticks(amount))

export const getPie = key => d3.pie().value(d => d[key])

export const getArc = radius =>
  d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius)
