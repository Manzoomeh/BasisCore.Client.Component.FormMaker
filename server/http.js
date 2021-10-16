const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/schema/:id/questions", function (req, res) {
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

router.get("/schema/:rKey/fix-data/:prpId/:part", function (req, res) {
    const fixDataStr = fs.readFileSync(
        path.join(__dirname, "data.json"),
        {
            encoding: "utf8",
        }
    );
    const fixData = JSON.parse(fixDataStr);
    res.json(fixData[req.params.prpId])

});

module.exports = router