import { scaleLinear } from "d3"

export const getScaleLinear = (domain, range) =>
  scaleLinear()
    .domain(domain)
    .range(range)
