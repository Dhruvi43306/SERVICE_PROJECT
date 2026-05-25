import { ResultSetHeader } from "mysql2";
import { db } from "../db/mysql";
import { User } from "../type/users.type";
import { Campus } from "../type/campus.type";

export async function findAllServiceCampus(): Promise<Campus[]> {
  try {
    const [data, field] = await db.query(`SELECT * FROM Campus`);
    return data as Campus[];
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function findCampusgetById(id: number): Promise<Campus | null> {
  try {
    const [data, field] = await db.query(
      `SELECT * FROM Campus where CampusID = ${id}`,
    );
    const user = data as Campus[];
    return user.length > 0 ? user[0] : null;
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function insertCampus(
  formdata: Campus,
  user: User,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `INSERT INTO Campus
            (CampusName, CampusCode,Address, City, State, Country, IsActive)
            VALUES (?, ?, ?, ?,?, ?,?)`,
      [
        formdata.CampusName,
        formdata.CampusCode,
        formdata.Address || null,
        formdata.City,
        formdata.State || null,
        formdata.Country,
        formdata.IsActive || 1,
      ],
    );

    return data;
  } catch (err: any) {
    console.error(err.sqlMessage);
    throw err;
  }
}

export async function updateCampusById(
  formdata: Campus,
  id: number,
  user: User,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `
        UPDATE Campus
        SET 
        CampusName = ?,
        CampusCode = ?,
        ddress = ?,
        City = ?,
        State = ?,
        Country = ?,
        IsActive = ?
        WHERE CampusID = ?`,
      [
        formdata.CampusName,
        formdata.CampusCode,
        formdata.Address || null,
        formdata.City,
        formdata.State || null,
        formdata.Country,
        formdata.IsActive,
        id,
      ],
    );

    return data;
  } catch (err: any) {
    console.log("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}

export async function deleteCampusById(id: number): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `DELETE FROM Campus where CampusID = ${id}`,
    );
    return data;
  } catch (err: any) {
    console.error("MYSQL ERROR:", err.sqlMessage);
    throw err;
  }
}
