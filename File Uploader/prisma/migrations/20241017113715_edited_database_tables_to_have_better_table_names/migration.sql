/*
  Warnings:

  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `folder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_fileID_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_userID_fkey";

-- DropTable
DROP TABLE "File";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "folder";

-- CreateTable
CREATE TABLE "userTable" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "userTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fileTable" (
    "id" SERIAL NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userID" INTEGER NOT NULL,
    "fileID" INTEGER NOT NULL,

    CONSTRAINT "fileTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "folderTable" (
    "id" SERIAL NOT NULL,
    "folder_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "folder_size" BYTEA NOT NULL,

    CONSTRAINT "folderTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userTable_email_key" ON "userTable"("email");

-- CreateIndex
CREATE UNIQUE INDEX "fileTable_file_name_key" ON "fileTable"("file_name");

-- CreateIndex
CREATE UNIQUE INDEX "folderTable_folder_name_key" ON "folderTable"("folder_name");

-- AddForeignKey
ALTER TABLE "fileTable" ADD CONSTRAINT "fileTable_userID_fkey" FOREIGN KEY ("userID") REFERENCES "userTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fileTable" ADD CONSTRAINT "fileTable_fileID_fkey" FOREIGN KEY ("fileID") REFERENCES "folderTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
