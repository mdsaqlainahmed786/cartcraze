/*
  Warnings:

  - The `size` column on the `Cart` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('S', 'M', 'L', 'XL', 'XXL');

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "size",
ADD COLUMN     "size" "Size" NOT NULL DEFAULT 'S';
