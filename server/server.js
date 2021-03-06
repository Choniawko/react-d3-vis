const app = require("express")()
const http = require("http").createServer(app)
const io = require("socket.io")(http)

const PORT = 5000

const interval = () => {
  const value = Math.floor(Math.random() * 101)
  io.emit("value", value)
  console.log("emit value", value)
}

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  )
  next()
})

app.get("/", (_, res) => {
  res.json({
    status: "ok",
  })
})

io.on("connection", socket => {
  setInterval(interval, 100)
  console.log("a user connected")
  socket.on("disconnect", () => {
    clearInterval(interval)
  })
})

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
