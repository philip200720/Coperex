import { Schema, model} from "mongoose";

const companySchema = Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            unique: true
          },
        rate:{
            type: Number,
            required: [true, "Rate is required"],
            enum: [1, 2, 3, 4, 5]
        },
        foundingYear:{
            type: Number,
            required: [true, "Founding date is required"],
        },
        category:{
            type: String,
            required: [true, "Category is required"],
            enum: ["PRIMARY", "SECONDARY", "TERTIARY", "QUATERNARY"]
        }
    },
    {
        versionKey: false,
        timeStamps: true
    }
)

export default model("Company", companySchema)