ALTER TABLE "projects" ADD COLUMN "status" text DEFAULT 'ongoing';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "priority" text DEFAULT 'medium';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "name" text;