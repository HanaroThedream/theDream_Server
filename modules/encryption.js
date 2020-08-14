const crypto = require("crypto");

module.exports = {
  newSaltEncrypt: (password) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(64, (err, buf) => {
        if (err) {
          reject(err);
        } else {
          const salt = buf.toString("base64");
          crypto.pbkdf2(password, salt, 108789, 64, "sha512", (err, hashed) => {
            if (err) {
              reject(err);
            } else {
              const hashedPassword = hashed.toString("base64");
              resolve({
                salt,
                hashedPassword,
              });
            }
          });
        }
      });
    });
  },

  saltEncrypt: (password, salt) => {
    return new Promise((resolve, reject) => {
      crypto,
        crypto.pbkdf2(password, salt, 108789, 64, "sha512", (err, hashed) => {
          if (err) {
            reject(err);
          } else {
            resolve(hashed.toString("base64"));
          }
        });
    });
  },
};
