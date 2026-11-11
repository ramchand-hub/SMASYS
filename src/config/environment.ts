import "dotenv/config";

const config = {
  development: {
    // redisUrl: "redis://smasys-redis:6379",
    redisUrl: "redis://localhost:6379",
  },

  production: {
    redisUrl: process.env.REDIS_URL,
  },
};

const environment = process.env.NODE_ENV || "development";

export const appConfig =
  config[environment as keyof typeof config];