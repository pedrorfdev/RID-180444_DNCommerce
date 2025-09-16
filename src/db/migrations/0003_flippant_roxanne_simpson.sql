ALTER TABLE "customers" RENAME COLUMN "customer_name" TO "name";--> statement-breakpoint
ALTER TABLE "customers" RENAME COLUMN "customer_email" TO "email";--> statement-breakpoint
ALTER TABLE "customers" RENAME COLUMN "customer_password" TO "password";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "order_date" TO "created_at";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "product_name" TO "name";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "product_description" TO "description";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "product_price" TO "price";--> statement-breakpoint
ALTER TABLE "sales" RENAME COLUMN "sale_date" TO "created_at";--> statement-breakpoint
ALTER TABLE "sales" RENAME COLUMN "sale_value" TO "value";--> statement-breakpoint
ALTER TABLE "stocks" RENAME COLUMN "stock_name" TO "name";--> statement-breakpoint
ALTER TABLE "stocks" RENAME COLUMN "stock_description" TO "description";--> statement-breakpoint
ALTER TABLE "customers" DROP CONSTRAINT "customers_customerEmail_unique";--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_email_unique" UNIQUE("email");