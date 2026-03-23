const User = require("../models/User")

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { createUser, getUsers }