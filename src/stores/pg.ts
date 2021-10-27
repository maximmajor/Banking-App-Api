//use to connect to your database
import postgres from 'postgres'

const sql = postgres(process.env.DATABASE_URL!)

export default sql;