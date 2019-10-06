const connectToMongoDB = require("./db_client");
const sampleTrips = require("../../../fixtures/trips.json");
const sampleUsers = require("../../../fixtures/users.json");
const _ = require('./db_helpers');

const internalMongoApi = db => ({
  async getUser(userId) {
    return sampleUsers.find(v => v.userId === userId);
  },
  async getUserNames(userIds) {},
  async getAllTrips() {},
  async getUserTrips(userId) {},
  async addTrip(trip) {},
  async reloadFixtures() {
    if (!db) return 'db not available';
    _.FIXTURES.forEach(([name, sampleData]) => {
      _.resetCollection(db, name, sampleData);
    });
    return 'done';
  }
});

module.exports = async () => {
  const hasDB = !!process.env.DB_URI
  const mongoClient = hasDB ? await connectToMongoDB() : null;
  return internalMongoApi(mongoClient);
};
