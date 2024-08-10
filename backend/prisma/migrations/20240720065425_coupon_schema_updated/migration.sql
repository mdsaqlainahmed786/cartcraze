/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Coupon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "expiresAt";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isCouponUsed" BOOLEAN NOT NULL DEFAULT false;
