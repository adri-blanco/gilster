CREATE TABLE `songs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`artist` text NOT NULL,
	`album` text NOT NULL,
	`cover` text NOT NULL,
	`spotify_url` text NOT NULL,
	`spotify_uri` text NOT NULL,
	`spotify_id` text NOT NULL,
	`release` integer NOT NULL,
	`game` text NOT NULL
);
