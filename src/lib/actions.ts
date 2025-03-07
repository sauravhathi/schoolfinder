import { logger } from "components/lib/utils";
import postgres from "../../config/db";

const queries = {
    getStates: 'SELECT * FROM states ORDER BY stateName ASC',
    getDistricts: 'SELECT * FROM districts ORDER BY districtName ASC',
    getBlocks: 'SELECT * FROM blocks ORDER BY blockName ASC',
    getRecordsWithCount: (table: string) => `
      WITH filtered_data AS (
        SELECT * FROM ${table}
        WHERE (universityName ILIKE $1
          OR collegeName ILIKE $1
          OR institutionName ILIKE $1
          OR schoolName ILIKE $1)
          AND state ILIKE $2
          AND district ILIKE $3
      )
      SELECT COUNT(*) AS totalItems, json_agg(filtered_data.*) AS results FROM filtered_data;
    `,
    globalSearch: `
     WITH filtered_data AS (
                    SELECT *
                    FROM schools
                    WHERE (LOWER(universityName) LIKE LOWER($1)
                           OR LOWER(collegeName) LIKE LOWER($1)
                           OR LOWER(institutionName) LIKE LOWER($1)
                           OR LOWER(schoolName) LIKE LOWER($1))
                )
                SELECT
                    (SELECT COUNT(*) FROM filtered_data) AS totalItems,
                    json_agg(data.*) AS results
                FROM (
                    SELECT *
                    FROM filtered_data
                    LIMIT $2 OFFSET $3
                ) AS data;
    `,
};

export const getSchools = async (search = "", state = "", district = "", page = 1, limit = 10) => {
    const client = await postgres.connect() as any;

    try {
        const offset = (page - 1) * limit;
        let query, values;
        let isGlobalSearch = !state && !district;

        if (!isGlobalSearch) {
            query = queries.getRecordsWithCount("schools");
            values = [`%${search}%`, `%${state}%`, `%${district}%`];
        } else {
            query = queries.globalSearch;
            values = [`%${search}%`, limit, offset];
        }

        const { rows } = await client.query(query, values);

        return {
            totalItems: rows[0]?.totalitems || 0,
            totalPages: Math.ceil(rows[0]?.totalitems / limit),
            page,
            search,
            next: `${process.env.NEXT_PUBLIC_URL}/schools?query=${search}&state=${state}&page=${page + 1}&limit=${limit}`,
            results: rows[0]?.results || []
        };
    } catch (error: any) {
        logger.error(error.message, "lib/actions.ts");
        throw new Error("Database Query Failed");
    } finally {
        client.release();
    }
};

export const getStates = async () => {
    const client = await postgres.connect() as any;
    try {
        const { rows } = await client.query(queries.getStates);
        return rows;
    }
    catch (err: any) {
        logger.error(err.message, "lib/actions.ts");
        throw err;
    }
    finally {
        client.release();
    }
}

export const getDistricts = async () => {
    const client = await postgres.connect() as any;
    try {
        const { rows } = await client.query(queries.getDistricts);
        return rows;
    }
    catch (err: any) {
        logger.error(err.message, "lib/actions.ts");
        throw err;
    }
    finally {
        client.release();
    }
}

export const getBlocks = async () => {
    const client = await postgres.connect() as any;
    try {
        const { rows } = await client.query(queries.getBlocks);
        return rows;
    }
    catch (err: any) {
        logger.error(err.message, "lib/actions.ts");
        throw err;
    }
    finally {
        client.release();
    }
}