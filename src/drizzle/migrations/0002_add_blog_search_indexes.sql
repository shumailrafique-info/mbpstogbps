CREATE EXTENSION IF NOT EXISTS pg_trgm;--> statement-breakpoint
CREATE INDEX "blogs_created_at_idx" ON "blogs" USING btree ("created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "blogs_title_trgm_idx" ON "blogs" USING gin ("title" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX "blogs_slug_trgm_idx" ON "blogs" USING gin ("slug" gin_trgm_ops);