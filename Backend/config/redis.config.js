// [REPLACE] Backend/config/redis.config.js
import { createClient } from "redis";

class MockRedis {
    constructor() { this.storage = new Map(); console.log("✅ In-Memory Fallback Active."); }
    async get(key) { return this.storage.get(key) || null; }
    async setEx(key, ttl, value) { this.storage.set(key, value); }
    async del(key) { this.storage.delete(key); }
    async connect() { return; }
    async quit() { return; }
}

let activeClient = new MockRedis(); // Start with Mock as a safe default

const redisClient = new Proxy({}, {
    get: (target, prop) => {
        return activeClient[prop] ? activeClient[prop].bind(activeClient) : undefined;
    }
});

const initializeRedis = async () => {
    try {
        const client = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379'
        });

        client.on('error', async (err) => {
            console.error('⚠️ Redis Connection Error. Staying on Mock.');
            try { await client.quit(); } catch (e) { } // Stop the retry loop
            activeClient = new MockRedis();
        });

        await client.connect();
        activeClient = client; // If connect succeeds, switch to real Redis
        console.log("🚀 Connected to Real Redis.");
    } catch (err) {
        console.log("❌ Redis Failed to Connect. Using Mock.");
        activeClient = new MockRedis();
    }
};

await initializeRedis();

export default redisClient;
