/*
  Warnings:

  - You are about to drop the column `fileID` on the `fileTable` table. All the data in the column will be lost.
  - Added the required column `folderID` to the `fileTable` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "fileTable" DROP CONSTRAINT "fileTable_fileID_fkey";

-- AlterTable
ALTER TABLE "fileTable" DROP COLUMN "fileID",
ADD COLUMN     "folderID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "fileTable" ADD CONSTRAINT "fileTable_folderID_fkey" FOREIGN KEY ("folderID") REFERENCES "folderTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
