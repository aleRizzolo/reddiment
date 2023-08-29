import mongoose from "mongoose"
import { Request, Response } from "express"

import { DatasetModel } from "../models/"

export const getDataset = async (req: Request, res: Response) => {
  try {
    const dataset = await DatasetModel.find({})

    if (dataset === null) {
      return res.status(404).send({ success: false, statusCode: 404, message: "Dataset not found" })
    }

    return res.status(200).send({ success: true, message: "Success", data: dataset })
  } catch (err: any) {
    console.error(err.stack)
    return res.status(500).send({ success: false, statusCode: 500, message: `Error: ${err}` })
  }
}
