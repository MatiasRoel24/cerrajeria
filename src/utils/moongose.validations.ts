import mongoose from "mongoose"


export const validateMongooseId = (id: number): boolean => {
    return mongoose.Types.ObjectId.isValid(id);
}