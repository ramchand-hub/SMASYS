import { createClient } from "redis";

const redis_connect = async () => {
  const client = createClient({
    socket: {
      host: "smasys-redis",
      port: 6379,
    },
  });

  client.on("error", (err) => {
    console.log("Redis error:", err);
  });

  await client.connect();

  console.log("Redis connected successfully");

  return client;
};

export default redis_connect;