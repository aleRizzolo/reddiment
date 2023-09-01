import { Router } from "express"

import { getDataset, getAllCollections } from "./handler"

const fetchDbRouter = Router()

fetchDbRouter.get("/dataset", getDataset)
fetchDbRouter.get("/collections", getAllCollections)

export default fetchDbRouter
