import { createClient } from "redis";
import { appConfig } from "./environment";
const redisClient = createClient({
  // socket: {
  //   host: "smasys-redis",
  //   port: 6379,
  // },
  url:appConfig?.redisUrl
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



