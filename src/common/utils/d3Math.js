import { scaleLinear, scaleOrdinal, histogram, pie, arc } from "d3"

export const getScaleLinear = ({ domain, range }) =>
  scaleLinear()
    .domain(domain)
    .range(range)
export const getScaleOrdinal = ({ domain, range }) =>
  scaleOrdinal()
    .domain(domain)
    .range(range)

export const getHistogram = ({ x, key, amount }) =>
  histogram()
    .value(d => d[key])
    .domain(x.domain())
    .thresholds(x.ticks(amount))

export const getPie = key => pie().value(d => d[key])

export const getArc = radius =>
  arc()
    .innerRadius(0)
    .outerRadius(radius)
