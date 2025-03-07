import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getCorsHeaders = (origin: string) => {
    const headers = {
        "Access-Control-Allow-Methods": `${process.env.ALLOWED_METHODS}`,
        "Access-Control-Allow-Headers": `${process.env.ALLOWED_HEADERS}`,
        "Access-Control-Allow-Origin": `${process.env.URL}`,
    };

    if (!process.env.ALLOWED_ORIGIN || !origin) return headers;

    const allowedOrigins = process.env.ALLOWED_ORIGIN.split(",");

    if (allowedOrigins.includes("*")) {
        headers["Access-Control-Allow-Origin"] = "*";
    } else if (allowedOrigins.includes(origin)) {
        headers["Access-Control-Allow-Origin"] = origin;
    }

    return headers;
};

export const logger = {
    info: (message: string, path: string = "") => {
        console.log(`[INFO] ${message} ${path}`);
    },
    error: (message: string, path: string = "") => {
        console.error(`[ERROR] ${message} ${path}`);
    },
    warn: (message: string, path: string = "") => {
        console.warn(`[WARN] ${message} ${path}`);
    },
};

export const getFromLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem(key)
        if (data) {
            return JSON.parse(data)
        }
    }
    return []
}