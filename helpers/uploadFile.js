const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (files, validExtensions = ["png", "jpg", "jpeg", "gif"]) => {
  return new Promise((resolve, reject) => {
    const { image } = files;
    const splitName = image.name.split(".");
    const extension = splitName[splitName.length - 1];

    if (!validExtensions.includes(extension)) {
      return reject(
        `Extension ${extension} is not allowed, ${extensionesValidas} `
      );
    }

    const tempName = uuidv4() + "." + extension;

    const uploadPath = path.join(__dirname, "../public", tempName);

    image.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(path.join("/", tempName));
    });
  });
};

module.exports = {
  uploadFile,
};
