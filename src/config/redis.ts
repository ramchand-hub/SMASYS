import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://smasys-redis:6379",
});

redisClient.on("error", (err) => {
  console.log("Redis Error:", err);
});

const redis_connect = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Redis connected successfully");
  }

  return redisClient;
};

export { redisClient, redis_connect };
