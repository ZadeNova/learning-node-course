/*
  Warnings:

  - The primary key for the `fileTable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `folderTable` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "fileTable" DROP CONSTRAINT "fileTable_folderID_fkey";

-- AlterTable
ALTER TABLE "fileTable" DROP CONSTRAINT "fileTable_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "folderID" SET DATA TYPE TEXT,
ADD CONSTRAINT "fileTable_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "fileTable_id_seq";

-- AlterTable
ALTER TABLE "folderTable" DROP CONSTRAINT "folderTable_pkey",
ADD COLUMN     "parentId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "folderTable_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "folderTable_id_seq";

-- AddForeignKey
ALTER TABLE "fileTable" ADD CONSTRAINT "fileTable_folderID_fkey" FOREIGN KEY ("folderID") REFERENCES "folderTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folderTable" ADD CONSTRAINT "folderTable_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "folderTable"("id") ON DELETE SET NULL ON UPDATE CASCADE;
