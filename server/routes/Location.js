const express = require("express")
const router = express.Router();
const asyncHandler = require("express-async-handler");

const crypto = require("crypto");

const Location = require("../models/LocationModel.js")

router.get('/', asyncHandler(async (req, res) => {
    const locations = await Location.find();

    res.status(200).json(locations);
}));

router.post('/', asyncHandler(async (req, res) => {
    if (!req.query) {
        res.status(400);
        throw new Error("Please enter query");
    }

    const newLocation = await Location.create({
        title: req.query.title,
        coordinates: [req.query.coordX, req.query.coordY],
        description: req.query.desc
    });

    res.status(200).json(newLocation);
}));

router.put('/', asyncHandler(async (req, res) => {

    const location = await Location.findById(req.query.id);

    if (!location) {
        res.status(400);
        throw new Error("Location ID Not found");
    }

    const updateLocation = await Location.findByIdAndUpdate(req.query.id, {
        title: req.query.title,
        coordinates: [req.query.coordX, req.query.coordY],
        description: req.query.desc
    }, { new: true })

    res.status(200).json(updateLocation);
}));

router.delete('/', asyncHandler(async (req, res) => {
    const location = await Location.findById(req.query.id);

    if (!location) {
        res.status(400);
        throw new Error("Location ID Not found");
    }

    const deleteLocation = await Location.findByIdAndDelete(req.query.id);

    res.status(200).json(deleteLocation);

}));

module.exports = router;