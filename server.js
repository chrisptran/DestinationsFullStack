//1. import dependencies
const express = require("express")
const app = express()
const cors = require("cors")

// 2. config
require("./config/mongoose.config")

app.use(cors())
app.use(express.json(), express.urlencoded({ extended: true }))

// 3. routes
const Routes = require("./routes/destination.routes")
Routes(app)

// 4. listen to port
app.listen(8000, () => console.log("listening to port 8000"))