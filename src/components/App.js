import React from "react"
import { BubblePlot } from "./BubblePlot"
import { Histogram } from "./Histogram"
import { PieChart } from "./PieChart"

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <BubblePlot />
      <Histogram />
      <PieChart />
    </div>
  )
}

export default App
