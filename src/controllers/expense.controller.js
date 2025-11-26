import { Expense } from '../models/expense.models.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asynHandler.js'

export const createExpense = asyncHandler(async (req, res) => {
    try {
        const userId = req.user?._id

        if(!userId) throw new ApiError(401, "Unauthorized");

        let {amount, description, date, category} = req.body

        if(
            amount === undefined ||
            description === undefined ||
            date === undefined ||
            category === undefined
        ) {
            return res
            .status(400)
            .json(new ApiResponse(
                400, {}, "Amount, description, date and categories are required"
            ))
        }

        amount = Number(amount)
        if(Number.isNaN(amount) || amount <= 0) {
            throw new ApiError(400, "Amount must be a positive number")
        }

        description = String(description).trim()
        category = String(category).trim()

        if(!description) throw new ApiError(400, "Description cannot be empty");
        if(!category) throw new ApiError(400, "Category cannot be empty");

        const parsedDate = new Date(date)
        if(isNaN(parsedDate.getTime())) {
            throw new ApiError(400, "Invalid date format")
        } 

        const expense = await Expense.create({
            amount,
            description,
            date: parsedDate,
            category,
            userId
        })

        return res
        .status(201)
        .json(new ApiResponse(
            201,
            {expense},
            "Expense created successfully"
        ))
    } catch (error) {
        console.error("Failed to create expense: ", error);
        throw new ApiError(401, "Failed to create expense")
    }
})

export const updateExpense = asyncHandler(async (req, res) => {
    try {
        const userId = req.user?._id

        if (!userId) {
            throw new ApiError(401, "Unauthorized")
        }

        const {amount, description, date, category} = req.body
        const { expenseId } = req.params
        const updates = {}

        if(amount !== undefined) {
            const amt = Number(amount)
            if(Number.isNaN(amt) || amt <= 0) {
                throw new ApiError(400, "Amount must be a positive number")
            }

            updates.amount = amt
        }

        if(description !== undefined) {
            const desc = String(description).trim()
            if(!desc) throw new ApiError(400, "Description cannot be empty");

            updates.description = desc
        }

        if(category !== undefined) {
            const cat = String(category).trim()
            if(!cat) throw new ApiError(400, "Category cannot be empty");

            updates.category = cat
        }

        if(date !== undefined) {
            const parsedDate = new Date(date)
            if(isNaN(parsedDate.getTime())) {
                throw new ApiError(400, "Invalid date format");
            }

            updates.date = parsedDate
        }

        if(Object.keys(updates).length === 0) {
            throw new ApiError(400, "No valid fields provided to update")
        }

        const expense = await Expense.findOneAndUpdate(
            {_id: expenseId, userId},
            {
                $set: updates
            },
            {new: true}
        )

        if(!expense) {
            throw new ApiError(404, "Expense not found")
        }

        return res
        .status(200)
        .json(new ApiResponse(
            200,
            {expense},
            "Expense updated successfully"
        ))
    } catch (error) {
        console.error("Failed to update expense: ", error);
        throw new ApiError(401, "Failed to update expense")
    }
})

export const deleteExpense = asyncHandler(async (req, res) => {
    try {
        const userId = req.user?._id

        if(!userId) {
            throw new ApiError(401, "Unauthorized")
        }

        const {expenseId} = req.params

        const deleted = await Expense.findOneAndDelete({_id: expenseId, userId})

        if(!deleted) throw new ApiError(404, "Expense not found");

        return res
        .status(200)
        .json(new ApiResponse(
            200,
            null,
            "Expense deleted successfully"
        ))
    } catch (error) {
        console.error("Failed to delete expense: ", error);
        throw new ApiError(401, "Failed to delete expense")
    }
})

export const getExpense = asyncHandler(async (req, res) => {
    const userId = req.user?._id

    if(!userId) {
        throw new ApiError(401, "Unauthorized")
    }

    const { category, startDate, endDate } = req.query

    const filter = { userId } 

    if(category) {
        filter.category = String(category).trim()
    }

    if(startDate || endDate) {
        filter.date = {}
        if(startDate) {
            const sd = new Date(startDate)
            if(isNaN(sd.getTime())) {
                throw new ApiError(400, "Invalid startDate")
            }
            filter.date.$gte = sd
        }

        if(endDate) {
            const ed = new Date(endDate)
            if(isNaN(ed.getTime())) {
                throw new ApiError(400, "Invalid endDate")
            }
            filter.date.$lte = ed
        }
    }

    const expenses = await Expense.find(filter).sort({date: -1})

    return res
    .status(200)
    .json(new ApiResponse(
        200, 
        {expenses},
        "Expenses fetched successfully"
    ))
})