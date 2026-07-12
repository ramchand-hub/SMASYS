import { createClient } from "redis";

const redis_connect = () => {
const client = createClient({
  socket: {
    host: "doctor-statement-bubble-95358.db.redis.io",
    port: 10592,
  },
  password: "YOUR_PASSWORD",
});

  client.on("error", (err) => {
    console.log("Redis error:", err);
  });

  client.connect();
  return client
};

export default redis_connect;
