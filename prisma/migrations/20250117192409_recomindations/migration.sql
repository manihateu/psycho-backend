-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('LIKE', 'STARTED', 'COMPLETED');

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "countLiked" SET DEFAULT 0,
ALTER COLUMN "countListened" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "UserCourseInteraction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "interactionType" "InteractionType" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserCourseInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCourseInteraction_userId_courseId_interactionType_key" ON "UserCourseInteraction"("userId", "courseId", "interactionType");

-- AddForeignKey
ALTER TABLE "UserCourseInteraction" ADD CONSTRAINT "UserCourseInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourseInteraction" ADD CONSTRAINT "UserCourseInteraction_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
