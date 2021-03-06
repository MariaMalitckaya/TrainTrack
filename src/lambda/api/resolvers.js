const polyline = require("polyline-extended");

module.exports = api => ({
  Query: {
    reloadFixtures: async () => {
      return api.reloadFixtures();
    },
    hello: async () => "Hello, world!",
    lastTrips: () => api.getLastTrips(),
    statistics: () => api.getStatistics(),
    userTrips: (root, args) => api.getUserTrips(args.userId),
    userStatistics: (root, args) => api.getStatistics(args.userId),
    userProfile: async (root, args) => api.getUser(args.userId),
    userNames: async () => {
      const names = await api.getUserNames();
      return names;
    },
    leaderboard: async () => api.getLeaderboard()
  },
  Mutation: {
    addTrip: async (root, args, context) => {
      if (!context.user || !args.trip) {
        return null;
      }
      const userId = context.user.sub;
      const { path } = args.trip;
      const distance = Math.round(polyline.length(path, "meter"));
      const populatedTrip = {
        ...args.trip,
        userId,
        distance
      };
      api.addTrip(populatedTrip);
      return populatedTrip;
    },
    deleteTrip: async (root, args, context) => {
      if (!args.id || !context.user) return null;
      const n = await api.deleteTrip(args.id, context.user.sub);
      if (n === 0) return null;
      return args.id;
    },
    registerUser: (root, args, { user }) => {
      if (!user) return;

      api.upsertUser({
        userId: user.sub,
        name: user.user_metadata.full_name
      });
    }
  }
});
