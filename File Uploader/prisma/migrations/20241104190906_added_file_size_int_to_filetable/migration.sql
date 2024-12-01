/*
  Warnings:

  - Added the required column `file_size` to the `fileTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fileTable" ADD COLUMN     "file_size" INTEGER NOT NULL;
