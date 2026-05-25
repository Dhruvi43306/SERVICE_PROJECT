import { createPool } from "mysql2/promise"


export const db = createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"service_project",
    connectionLimit:10
})

