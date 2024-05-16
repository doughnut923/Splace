const express = require("express")
const router = express.Router();
const asyncHandler = require("express-async-handler");

const crypto = require("crypto");

const User = require("../models/UserModel.js")

router.get('/', asyncHandler(async (req, res) => {
    const users = await User.find();

    res.status(200).json(users);
}));

router.post('/', asyncHandler(async (req, res) => {
    if (!req.query) {
        res.status(400);
        throw new Error("Please enter query");
    }

    const user = await User.create({
        username: req.query.username,
        password: req.query.password
    });

    res.status(200).json(user);
}));

router.put('/', asyncHandler(async (req, res) => {

    const user = await User.findById(req.query.id);

    if (!user) {
        res.status(400);
        throw new Error("User ID Not found");
    }

    const updateUser = await User.findByIdAndUpdate(req.query.id, {
        title: req.query.title,
        username: req.query.username,
        password: req.query.password
    }, { new: true })

    res.status(200).json(updateUser);
}));

router.delete('/', asyncHandler(async (req, res) => {
    const user = await User.findById(req.query.id);

    if (!user) {
        res.status(400);
        throw new Error("User ID Not found");
    }

    const deleteUser = await User.findByIdAndDelete(req.query.id);

    res.status(200).json(deleteUser);

}));

module.exports = router;