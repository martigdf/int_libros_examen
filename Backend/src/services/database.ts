import pg from '../../node_modules/@types/pg/index.js'

const { Pool } = pg

const pool = new Pool()

export const query = async (text: string, params?: (string|number|string[]|number[])[]) => {
    // const start = Date.now()
    const res = await pool.query(text, params)
    // const duration = Date.now() - start
    // console.log('executed query', { text, duration, rows: res.rowCount })
    return res
}