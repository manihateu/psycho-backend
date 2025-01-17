import { CoursesService } from './courses.service';
import { Response } from 'express';
import { RecomendationService } from 'src/recomendation/recomendation.service';
import { AuidioDataDto, CreateCourseDto, FilesOnCreateCourseDto, FindOneCourseParams } from './courses.dto';
export declare class CoursesController {
    private coursesService;
    private readonly recomenationService;
    constructor(coursesService: CoursesService, recomenationService: RecomendationService);
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
    getCourseById(id: string): Promise<{
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
    likeCourse(courseId: string, req: any): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    dislikeCourse(courseId: string, req: any): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    getListenCount(courseId: string): Promise<number>;
    createCourse(files: FilesOnCreateCourseDto, createCourseDto: CreateCourseDto): Promise<{
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
    addAudioToCourse(files: {
        audio?: Express.Multer.File[];
    }, courseId: FindOneCourseParams, audioData: AuidioDataDto): Promise<{
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
    streamAudio(audioId: string, courseId: string, res: Response, req: any): Promise<void>;
}
