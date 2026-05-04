-- Add India-specific transaction fields for GST and payment rails
ALTER TABLE "transactions"
ADD COLUMN IF NOT EXISTS "gst_percentage" INTEGER,
ADD COLUMN IF NOT EXISTS "gst_amount" INTEGER,
ADD COLUMN IF NOT EXISTS "payment_method" TEXT;

CREATE INDEX IF NOT EXISTS "transactions_payment_method_idx" ON "transactions"("payment_method");
