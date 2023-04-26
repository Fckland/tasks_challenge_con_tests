const jwt = require("jsonwebtoken");

const generateJWT = async (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    // SECTERORPRIVATEKEY se definio como variable de entorno y es la clave secreta que va a encriptar el JWT
    jwt.sign(
      payload,
      process.env.PRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = generateJWT;
