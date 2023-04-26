const mongoose = require("mongoose");

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  const promises = collections.map((collectionName) => {
    const collection = mongoose.connection.collections[collectionName];
    return collection.deleteMany();
  });
  await Promise.all(promises);
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  const promises = collections.map((collectionName) => {
    const collection = mongoose.connection.collections[collectionName];
    return collection.drop();
  });
  await Promise.all(promises);
}

module.exports = {
  setupDB(server) {
    // Connect to Mongoose
    beforeAll(async () => {
      await server.conectarDB();
    });

    // Cleans up database between each test
    afterEach(async () => {
      await removeAllCollections();
    });

    // Disconnect Mongoose
    afterAll(async () => {
      await dropAllCollections();
      await server.desconectarDB();
    });
  },
};
