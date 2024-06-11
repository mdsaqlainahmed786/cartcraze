/*
  Warnings:

  - You are about to drop the column `Image` on the `Product` table. All the data in the column will be lost.
  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Image",
ADD COLUMN     "image" TEXT NOT NULL;
