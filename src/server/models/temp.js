import mongoose from "mongoose";
const Schema = mongoose.Schema;
const tempSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);
const Temp = mongoose.model.Temp || mongoose.model("Temp", tempSchema);
export default Temp;
