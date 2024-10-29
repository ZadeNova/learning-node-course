-- DropForeignKey
ALTER TABLE "folderTable" DROP CONSTRAINT "folderTable_parentId_fkey";

-- AddForeignKey
ALTER TABLE "folderTable" ADD CONSTRAINT "folderTable_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "folderTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
