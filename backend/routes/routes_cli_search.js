const express = require('express');
const router = express.Router();

const Deed = require("../models/model_dem_deed");
const Case = require("../models/model_lcm_newcase");

// Unified search route for cases and deeds
router.get("/search_all", async (req, res) => {
    const searchQuery = req.query.q || "";
    
    if (!searchQuery.trim()) {
        return res.status(400).json({ message: "Search query cannot be empty." });
    }

    try {
        // Search cases by caseNumber, nic, or status
        const caseResults = await Case.find({
            $or: [
                { caseNumber: { $regex: searchQuery, $options: "i" } },
                { nic: { $regex: searchQuery, $options: "i" } },
                { status: { $regex: searchQuery, $options: "i" } }
            ]
        });

        // Search deeds by title or status
        const deedResults = await Deed.find({
            $or: [
                { title: { $regex: searchQuery, $options: "i" } },
                { deedStatus: { $regex: searchQuery, $options: "i" } }
            ]
        });

        res.status(200).json({
            cases: caseResults,
            deeds: deedResults
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
