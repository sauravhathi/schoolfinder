import { logger } from "components/lib/utils";
import pg from "pg";

const config = {
    user: process.env.PGUSER as string,
    password: process.env.PGPASSWORD as string,
    host: process.env.PGHOST as string,
    port: parseInt(process.env.PGPORT as string),
    database: process.env.PGDATABASE as string,
    ssl: {
        rejectUnauthorized: true,
        ca: (process.env.PGCA as string).split("\n").map((line) => line.trim()).join("\n"),
    },
};

const pool = new pg.Pool(config);

const postgres = {
    connect: async () => {
        try {
            logger.info("Connecting to PostgreSQL...", "config/db.ts");
            return await pool.connect();
        }
        catch (err: any) {
            logger.error(err.message, "config/db.ts");
        }
    }
};

export default postgres;