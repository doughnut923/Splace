const express = require("express")
const router = express.Router();
const asyncHandler = require("express-async-handler");

const crypto = require("crypto");

const User = require("../models/UserModel.js")

router.get('/', asyncHandler(async (req, res) => {
    if (req.query.username) {
        if (user) {
            res.status(200).json(user);
            return;
        }
        res.status(400);
        throw new Error("User ID not found")
    }
    if (req.query.id) {
        const user = await User.findById(req.query.id);
        if (user) {
            res.status(200).json(user);
            return;
        }
        res.status(400);
        throw new Error("User ID not found")
    }
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
        password: req.query.password,
        locations: []
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
        username: req.query.username,
        password: req.query.password
    }, { new: true })

    res.status(200).json(updateUser);
}));

router.put('/addLocationToUser', asyncHandler(async (req, res) => {

    const user = await User.findById(req.query.id);

    if (!user) {
        res.status(400);
        throw new Error("User ID Not found");
    }

    console.log(req.query.newLocation);

    user.locations.push(req.query.newLocation);
    await user.save()

    res.status(200).json(user);
    
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

router.get("/checkpassword/", asyncHandler(async (req, res) => {

    const user = await User.findOne({ username: req.query.username })
    console.log("someone!")
    res.set('Access-Control-Allow-Origin', '*');
    if (!user) {
        res.status(400);
        throw new Error("Username Not Found");
    }
    if (user.password === req.query.password) {
        res.status(200).send({
            "login_status": "Success",
            "id" : user.id
        });
        return
    }
    res.status(200).send({ "login_status": "Fail" });

}));

module.exports = router;