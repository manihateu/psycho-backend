import { PrismaService } from '../prisma/prisma.service';
import { AuidioDataDto } from './courses.dto';
export declare class CoursesService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllCourses(): Promise<({
        audioFiles: {
            id: number;
            name: string;
            duration: number;
            fileUrl: string;
        }[];
    } & {
        id: number;
        name: string;
        type: import(".prisma/client").$Enums.CourseTypes;
        cardLogoUrl: string;
        cardBgUrl: string;
        description: string;
        timeFrom: number;
        timeTo: number;
        cardLogoBgColor: string;
        countLiked: number;
        countListened: number;
    })[]>;
    getCourseById(id: number): Promise<{
        id: number;
        name: string;
        type: import(".prisma/client").$Enums.CourseTypes;
        cardLogoUrl: string;
        cardBgUrl: string;
        description: string;
        timeFrom: number;
        timeTo: number;
        cardLogoBgColor: string;
        countLiked: number;
        countListened: number;
    }>;
    likeCourse(courseId: number, userId: number): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    getLikesCountByCourseId(courseId: number): Promise<number>;
    dislikeCourse(courseId: number, userId: number): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    getAudioById(id: number): Promise<{
        id: number;
        name: string;
        duration: number;
        fileUrl: string;
    }>;
    createCourse(data: {
        name: string;
        description: string;
        type?: 'КУРС' | 'МЕДИТАЦИЯ';
        timeFrom: number;
        timeTo: number;
        cardLogoUrl: string;
        cardLogoBgColor: string;
        cardBgUrl: string;
    }): Promise<{
        id: number;
        name: string;
        type: import(".prisma/client").$Enums.CourseTypes;
        cardLogoUrl: string;
        cardBgUrl: string;
        description: string;
        timeFrom: number;
        timeTo: number;
        cardLogoBgColor: string;
        countLiked: number;
        countListened: number;
    }>;
    addListen(id: number): Promise<{
        id: number;
        name: string;
        type: import(".prisma/client").$Enums.CourseTypes;
        cardLogoUrl: string;
        cardBgUrl: string;
        description: string;
        timeFrom: number;
        timeTo: number;
        cardLogoBgColor: string;
        countLiked: number;
        countListened: number;
    }>;
    addAudioToCourse(courseId: number, audioData: AuidioDataDto, fileUrl: string): Promise<{
        audioFiles: {
            id: number;
            name: string;
            duration: number;
            fileUrl: string;
        }[];
    } & {
        id: number;
        name: string;
        type: import(".prisma/client").$Enums.CourseTypes;
        cardLogoUrl: string;
        cardBgUrl: string;
        description: string;
        timeFrom: number;
        timeTo: number;
        cardLogoBgColor: string;
        countLiked: number;
        countListened: number;
    }>;
}
