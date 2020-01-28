import React from "react"
import { SocketIOProvider } from "use-socketio"
import { RTLineChart } from "./RTLineChart"
import { BubblePlot } from "./BubblePlot"
import { Histogram } from "./Histogram"
import { PieChart } from "./PieChart"
import { ScatterPlot } from "./ScatterPlot"
import { LineChart } from "./LineChart"
import { Geo } from "./Geo"

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <SocketIOProvider url="http://localhost:5000">
        <RTLineChart />
      </SocketIOProvider>
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
