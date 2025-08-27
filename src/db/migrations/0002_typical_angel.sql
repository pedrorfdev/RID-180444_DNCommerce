ALTER TABLE "stock_items" RENAME TO "stock_products";--> statement-breakpoint
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_productId_unique";--> statement-breakpoint
ALTER TABLE "stock_products" DROP CONSTRAINT "stock_items_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "stock_products" DROP CONSTRAINT "stock_items_stock_id_stocks_id_fk";
--> statement-breakpoint
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "stock_products" ADD CONSTRAINT "stock_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_products" ADD CONSTRAINT "stock_products_stock_id_stocks_id_fk" FOREIGN KEY ("stock_id") REFERENCES "public"."stocks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stocks" DROP COLUMN "product_id";