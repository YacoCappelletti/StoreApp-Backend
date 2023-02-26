const { request, response } = require("express");

const validateFileToUpload = (req = request, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
    return res.status(400).json("There are no files to upload");
  }

  next();
};

module.exports = {
  validateFileToUpload,
};
