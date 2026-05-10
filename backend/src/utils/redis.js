import Redis from "ioredis";
import "dotenv/config";

const client = new Redis(process.env.REDIS_URL);

client.on("connect", () => console.log("🚀 Redis connected"));
client.on("error", (err) => console.log("❌ Redis Error", err));

export default client;
