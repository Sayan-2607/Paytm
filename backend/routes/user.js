// backend/routes/user.js
const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

router.post("/signup", async (req, res) => {
    try {
        const { success } = signupBody.safeParse(req.body)
        if (!success) {
            return res.status(411).json({
                message: "Email already taken / Incorrect inputs"
            })
        }

        const existingUser = await User.findOne({ username: req.body.username })
        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken / Incorrect inputs"
            })
        }

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })

        const userId = user._id;
        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })

        const token = jwt.sign({ userId }, JWT_SECRET);
        res.json({
            message: "User created successfully",
            token: token
        })
    } catch (e) {
          console.error("Signup error:", e.message, e.code);
    res.status(500).json({ message: e.message })
    }
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {
    try {
        const { success } = signinBody.safeParse(req.body)
        if (!success) {
            return res.status(411).json({
                message: "Incorrect inputs"
            })
        }

        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if (user) {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET);
            return res.json({ token: token })
        }

        res.status(411).json({ message: "Error while logging in" })
    } catch (e) {
        res.status(500).json({ message: "Internal server error" })
    }
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    try {
        const { success } = updateBody.safeParse(req.body)
        if (!success) {
            return res.status(411).json({
                message: "Error while updating information"
            })
        }

        // ✅ Fixed: correct argument order for updateOne
        await User.updateOne({ _id: req.userId }, { $set: req.body })

        res.json({ message: "Updated successfully" })
    } catch (e) {
        res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/bulk", async (req, res) => {
    try {
        const filter = req.query.filter || "";
        const users = await User.find({
            $or: [
                { firstName: { "$regex": filter, "$options": "i" } },
                { lastName: { "$regex": filter, "$options": "i" } }
            ]
        })

        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
    } catch (e) {
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router;