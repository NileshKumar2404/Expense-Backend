import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 200
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

export const Expense = mongoose.model("Expense", expenseSchema)