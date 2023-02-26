const validateJWT = require("./validate-jwt");
const validateFile = require("./validateFile");
const validation = require("./validations");

module.exports = {
  ...validateJWT,
  ...validateFile,
  ...validation,
};
