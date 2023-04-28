const { request, response } = require("express");
const axios = require("axios");

const postProducts = async (req = request, res = response) => {
  // axios.get('https://tiendanube.requestcatcher.com/products')
  // create a webhook that gets the products created in this web https://api.tiendanube.com/v1/3117493/products/

  const resp = await axios.post(
    "https://api.tiendanube.com/v1/3117493/webhooks/",
    {
      event: "product/created",
      url: "https://tiendanubeee.requestcatcher.com/",
    }, {
        headers: {
          "Content-Type": "application/json",
          "Authentication": `bearer ${'4494fe1bb1ad108487a0c90530e747ba2446e07f'}`,
          "User-Agent": 'MCS matias@apeirongs.com'
        }
    }
    );
    res.sendStatus(200)
};

module.exports = postProducts;
