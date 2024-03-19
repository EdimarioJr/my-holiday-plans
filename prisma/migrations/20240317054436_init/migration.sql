-- CreateTable
CREATE TABLE "HolidayPlan" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" BOOLEAN NOT NULL,
    "participant" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HolidayPlan_pkey" PRIMARY KEY ("id")
);
