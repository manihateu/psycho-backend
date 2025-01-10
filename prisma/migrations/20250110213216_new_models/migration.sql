-- CreateEnum
CREATE TYPE "CourseTypes" AS ENUM ('КУРС', 'МЕДИТАЦИЯ');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "imageurl" TEXT;

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "CourseTypes" NOT NULL DEFAULT 'КУРС',
    "timeFrom" INTEGER NOT NULL,
    "timeTo" INTEGER NOT NULL,
    "cardLogoUrl" TEXT NOT NULL,
    "cardLogoBgColor" TEXT NOT NULL,
    "cardBgUrl" TEXT NOT NULL,
    "countLiked" INTEGER NOT NULL,
    "countListened" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudioFile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "AudioFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserLikedCourses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserLikedCourses_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CourseAudioFiles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CourseAudioFiles_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserLikedCourses_B_index" ON "_UserLikedCourses"("B");

-- CreateIndex
CREATE INDEX "_CourseAudioFiles_B_index" ON "_CourseAudioFiles"("B");

-- AddForeignKey
ALTER TABLE "_UserLikedCourses" ADD CONSTRAINT "_UserLikedCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikedCourses" ADD CONSTRAINT "_UserLikedCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseAudioFiles" ADD CONSTRAINT "_CourseAudioFiles_A_fkey" FOREIGN KEY ("A") REFERENCES "AudioFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseAudioFiles" ADD CONSTRAINT "_CourseAudioFiles_B_fkey" FOREIGN KEY ("B") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
