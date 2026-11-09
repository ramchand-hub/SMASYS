import { redisClient } from "../../config/redis";

export const setkey = async (key: string, value: string, expiry?: number) => {
    if (expiry) {
        return redisClient.set(key, value, {
            EX: expiry,
        })
    }

    return await redisClient.set(key, value)
}

export const getkey = (key: string) => {
    return redisClient.get(key)
}

export const deletekey = (key: string) => {
    return redisClient.del(key)
}