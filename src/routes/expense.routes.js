import express from 'express'
import { createExpense, updateExpense, deleteExpense, getExpense } from '../controllers/expense.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.route("/create-expense").post(verifyJWT, createExpense)
router.route("/update-expense/:expenseId").patch(verifyJWT, updateExpense)
router.route("/delete-expense/:expenseId").delete(verifyJWT, deleteExpense)
router.route("/get-expense").get(verifyJWT, getExpense)

export default router