/*
  Warnings:

  - Added the required column `fileID` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "fileID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_fileID_fkey" FOREIGN KEY ("fileID") REFERENCES "folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
