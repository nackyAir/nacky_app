import { relations } from 'drizzle-orm'
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

// ユーザーテーブル
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  userName: text('user_name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ポストテーブル
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  authorId: serial('author_id')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// コメントのlikeもあるので、likeテーブルを作成

export const likes = pgTable('likes', {
  id: serial('id').primaryKey(),
  postId: serial('post_id')
    .references(() => posts.id)
    .notNull(),
  userId: serial('user_id')
    .references(() => users.id)
    .notNull(),
  commentId: serial('comment_id').references(() => comments.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  postId: serial('post_id')
    .references(() => posts.id)
    .notNull(),
  userId: serial('user_id')
    .references(() => users.id)
    .notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const postRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}))

export const likeRelations = relations(likes, ({ one }) => ({
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
}))

// スキーマの型定義をエクスポート
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Post = typeof posts.$inferSelect
export type NewPost = typeof posts.$inferInsert
