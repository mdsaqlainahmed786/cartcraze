-- CreateTable
CREATE TABLE "RecentOrder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orders" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecentOrder_pkey" PRIMARY KEY ("id")
);
