import type { InferSelectModel } from "drizzle-orm";
import type { blog, pageContent, user, userRoleEnum } from "./schema";

export type UserRoleType = (typeof userRoleEnum.enumValues)[number];
export type UserType = InferSelectModel<typeof user>;
export type BlogType = InferSelectModel<typeof blog>;

export type PageContentType = InferSelectModel<typeof pageContent>;

/** The subset of a user shown as a post byline. */
export type BlogAuthor = Pick<UserType, "id" | "name" | "image">;
