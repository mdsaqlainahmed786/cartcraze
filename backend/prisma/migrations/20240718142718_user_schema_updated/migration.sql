/*
  Warnings:

  - The `sizes` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sizes",
ADD COLUMN     "sizes" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "District" TEXT,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "phoneNumber" INTEGER,
ADD COLUMN     "pincode" INTEGER,
ADD COLUMN     "state" TEXT;
