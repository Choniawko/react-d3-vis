import React from "react"
import { BubblePlot } from "./BubblePlot"
import { Histogram } from "./Histogram"
import { PieChart } from "./PieChart"
import { ScatterPlot } from "./ScatterPlot"
import { LineChart } from "./LineChart"
import { Geo } from "./Geo"

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <BubblePlot />
      <Histogram />
      <ScatterPlot />
      <LineChart />
      <PieChart />
      <Geo />
    </div>
  )
}

export default App
