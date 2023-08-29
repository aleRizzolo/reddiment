import { Router } from "express"

import { getDataset } from "./handler"

const fetchDbRouter = Router()

fetchDbRouter.get("/dataset", getDataset)

export default fetchDbRouter
