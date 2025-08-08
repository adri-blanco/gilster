import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const songs = sqliteTable("songs", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  artist: text().notNull(),
  album: text().notNull(),
  cover: text().notNull(),
  spotify_url: text().notNull(),
  spotify_uri: text().notNull(),
  spotify_id: text().notNull(),
  release: int().notNull(),
  game: text().notNull(),
});

export type Song = typeof songs.$inferSelect;
