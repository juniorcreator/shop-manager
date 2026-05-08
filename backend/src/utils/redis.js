import Redis from "ioredis";
import "dotenv/config";

const client = new Redis(process.env.REDIS_URL);
await client.set("foo", "bar");

client.on("connect", () => console.log("🚀 Redis connected"));
client.on("error", (err) => console.log("❌ Redis Error", err));

export default client;
