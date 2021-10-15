const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/schema/:id/questions", function (req, res) {
    console.log(path.join(__dirname, `/schemas/${req.params.id}/questions.json`));
    const stream = fs.createReadStream(path.join(__dirname, `/schemas/${req.params.id}/questions.json`));
    stream.on("open", function () {
        res.set("Content-Type", "application/json");
        stream.pipe(res);
    });
    stream.on("error", function () {
        res.set("Content-Type", "text/plain");
        res.status(404).end("Not found");
    });
});

module.exports = router