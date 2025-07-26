import pg from 'pg';
const { Pool } = pg;
const pool = new Pool();
export const query = async (text, params) => {
    const res = await pool.query(text, params);
    return res;
};
//# sourceMappingURL=database.js.map