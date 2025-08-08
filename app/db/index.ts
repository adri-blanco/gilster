import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

const expo = SQLite.openDatabaseSync("gilster.db");
export const db = drizzle(expo);
