ALTER TABLE "blogs" ADD COLUMN "author_id" text;--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "blogs_author_idx" ON "blogs" USING btree ("author_id");