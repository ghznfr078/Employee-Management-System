import mongoose from "mongoose";

const departSchema = new mongoose.Schema({
    dep_name: {type: String, required: true},
    description: {type: String}
}, {timestamps: true})

export const Department = mongoose.model('Department', departSchema)