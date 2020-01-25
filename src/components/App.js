import React from "react"
import { BubblePlot } from "./BubblePlot"
import { Histogram } from "./Histogram"
import { PieChart } from "./PieChart"
import { ScatterPlot } from "./ScatterPlot"

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <BubblePlot />
      <Histogram />
      <ScatterPlot />
      <PieChart />
    </div>
  )
}

export default App
