import { Redis } from "ioredis";

const getUrlRedis = () => {
    if(process.env.REDIS_URL){
        return process.env.REDIS_URL;
    }

    throw new Error("Not found");
};

export const redis = new Redis(getUrlRedis());

