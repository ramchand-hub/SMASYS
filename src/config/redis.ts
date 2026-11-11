// import { createClient } from "redis";

// const redisClient = createClient({
//   socket: {
//     host: "smasys-redis",
//     port: 6379,
//   },
// });

// redisClient.on("error", (err) => {
//   console.log("Redis Error:", err);
// });

// const redis_connect = async () => {
//   if (!redisClient.isOpen) {
//     await redisClient.connect();
//     console.log("Redis connected successfully");
//   }

//   return redisClient;
// };

// export { redisClient, redis_connect };

// smasys-redis


import { createClient } from "redis";

const redisUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REDIS_URL
    : "redis://localhost:6379";


const redisClient = createClient({
  url: redisUrl,
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
