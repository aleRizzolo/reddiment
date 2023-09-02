import mongoose from "mongoose"

import { Image } from "../types"

const BarChartImages = new mongoose.Schema<Image>({
  chart_type: String,
  image_base64: String,
})

export default mongoose.model<Image>("BarChartImage", BarChartImages)
