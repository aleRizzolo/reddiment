import * as dotenv from "dotenv"
import express, { Express } from "express"

dotenv.config()

import { connectToDatabase } from "./db"
//import authRoutes from "./routes/auth/routes"

const port = process.env.PORT
const app: Express = express()

app.use(express.json())

//app.use("/", auth)

connectToDatabase()

app.listen(port, () => {
  console.info(`⚡️ Server is listening at ${port}`)
})
