import { createClient } from "redis";

const redisClient = createClient({
  socket: {
    // host: "smasys-redis",
    host: "localhost",
    port: 6379,
  },
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