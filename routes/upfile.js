const express = require("express");
const routerUpfile = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

routerUpfile.post("/", upload.single("upfile"), (req, res, next) => {
  const { originalname, mimetype, size } = req.file;
  const send = { name: originalname, type: mimetype, size: size };
  res.send({ send });
});

module.exports = routerUpfile;
