const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

const apiDataList = [];

for (let index = 1; index < 1000; index++) {
  const data = {
    id: index,
    value: Math.random().toString(36).substring(7),
  };
  apiDataList.push(data);
}

router.get("/schema/:id/questions", function (req, res) {
  const stream = fs.createReadStream(
    path.join(__dirname, `/schemas/${req.params.id}/questions.json`)
  );
  stream.on("open", function () {
    res.set("Content-Type", "application/json");
    stream.pipe(res);
  });
  stream.on("error", function () {
    res.set("Content-Type", "text/plain");
    res.status(404).end("Not found");
  });
});

router.get("/schema/:id/answer", function (req, res) {
  const stream = fs.createReadStream(
    path.join(__dirname, `/schemas/${req.params.id}/answers.json`)
  );
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
  const fixDataStr = fs.readFileSync(path.join(__dirname, "data.json"), {
    encoding: "utf8",
  });
  const fixData = JSON.parse(fixDataStr);
  res.json(fixData[req.params.prpId]);
});

router.get("/schema/autocomplete", (req, res) => {
  const term = req.query.term;
  const data = apiDataList.filter((x) => x.value.indexOf(term) > -1);
  res.json(data.filter((_, i) => i < 10));
});

module.exports = router;
