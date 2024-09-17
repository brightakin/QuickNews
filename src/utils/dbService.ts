import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {UserProps} from '../@types/defaultProps';

const tableName = 'users';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase(
    {name: 'quicknews.db', location: 'default'},
    () => {},
    error => {
      console.error(error);
      throw Error('Could not connect to database');
    },
  );
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);`;

  try {
    return await db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw Error('Failed to created user table');
  }
};

export const signUp = async (db: SQLiteDatabase, user: UserProps) => {
  const getUser = `SELECT id, first_name, last_name FROM ${tableName} WHERE email = ?`;
  const getValues = [user.email];

  const [userArray]: any = await db.executeSql(getUser, getValues);

  if (userArray.rows.length !== 0) {
    throw Error('User already exists');
  }

  const insertQuery = `
     INSERT INTO ${tableName} (first_name, last_name, email, password)
     VALUES (?, ?, ?, ?)
   `;
  const values = [user.firstName, user.lastName, user.email, user.password];
  try {
    return await db.executeSql(insertQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to created user');
  }
};

export const signIn = async (
  db: SQLiteDatabase,
  email: string,
  password: string,
) => {
  const getUser = `SELECT id, first_name, last_name FROM ${tableName} WHERE email = ? AND password= ?`;
  const values = [email, password];
  try {
    return await db.executeSql(getUser, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to created login');
  }
};

export const resetPassword = async (
  db: SQLiteDatabase,
  email: string,
  newPassword: string,
) => {
  const getUser = `UPDATE ${tableName} SET password = ? WHERE email = ?`;
  const values = [newPassword, email];
  try {
    return await db.executeSql(getUser, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to update password');
  }
};
