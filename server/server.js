const app = require("express")()
const http = require("http").createServer(app)
const io = require("socket.io")(http)

const PORT = 4000

app.get("/", (req, res) => {
  res.json({
    status: "ok",
  })
})

io.on("connection", socket => {
  console.log("a user connected")
})

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
