import mongoose from "mongoose"

import { Image } from "../types"

const ScatterPlotImages = new mongoose.Schema<Image>({
  chart_type: String,
  image_base64: String,
})

export default mongoose.model<Image>("ScatterPlotImage", ScatterPlotImages)
