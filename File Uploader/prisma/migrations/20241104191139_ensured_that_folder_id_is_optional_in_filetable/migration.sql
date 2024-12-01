-- DropForeignKey
ALTER TABLE "fileTable" DROP CONSTRAINT "fileTable_folderID_fkey";

-- AlterTable
ALTER TABLE "fileTable" ALTER COLUMN "folderID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "fileTable" ADD CONSTRAINT "fileTable_folderID_fkey" FOREIGN KEY ("folderID") REFERENCES "folderTable"("id") ON DELETE SET NULL ON UPDATE CASCADE;
