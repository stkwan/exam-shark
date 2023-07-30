-- AlterTable
ALTER TABLE "Choice" ADD COLUMN     "correct" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "snippet" TEXT;
