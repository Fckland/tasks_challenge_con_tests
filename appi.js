const express = require('express');


const appi = express();

appi.use(express.json());

appi.use("/hola", require("./appiRoute"));

// appi.listen(3000,() => {
//     console.log("Server is running");
// });

module.exports = appi;