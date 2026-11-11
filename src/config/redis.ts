import { createClient } from "redis";
import { appConfig } from "./environment";
const redisClient = createClient({
  // url: process.env.REDIS_URL || "redis://localhost:6379",
    url:appConfig?.redisUrl

});

console.log(appConfig?.redisUrl,'redis url..')

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
