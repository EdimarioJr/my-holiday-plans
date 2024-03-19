/*
  Warnings:

  - Added the required column `description` to the `HolidayPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HolidayPlan" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "participant" DROP NOT NULL;
