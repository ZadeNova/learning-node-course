/*
  Warnings:

  - Added the required column `file_url` to the `fileTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fileTable" ADD COLUMN     "file_url" TEXT NOT NULL;
