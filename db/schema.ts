import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const owner = sqliteTable("owner", { id: integer("id").primaryKey(), userId: text("user_id").notNull() });
export const sessions = sqliteTable("owner_sessions", {tokenHash:text("token_hash").primaryKey(),expiresAt:integer("expires_at").notNull(),credentialVersion:text("credential_version").notNull()});
export const attempts = sqliteTable("login_attempts", {key:text("key").primaryKey(),count:integer("count").notNull(),expiresAt:integer("expires_at").notNull()});
export const entries = sqliteTable("entries", {
  id: text("id").primaryKey(), category: text("category").notNull(),
  draft: text("draft").notNull(), published: text("published"),
  publishedAt: text("published_at"), updatedAt: text("updated_at").notNull(),
  version: integer("version").notNull().default(1),
}, t => [index("entries_category_published").on(t.category, t.publishedAt)]);
export const assets = sqliteTable("assets", {
  id: text("id").primaryKey(), name: text("name").notNull(), mime: text("mime").notNull(),
  size: integer("size").notNull(), createdAt: text("created_at").notNull(),
});
