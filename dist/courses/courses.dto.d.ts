export declare enum CourseTypes {
    КУРС = "\u041A\u0423\u0420\u0421",
    МЕДИТАЦИЯ = "\u041C\u0415\u0414\u0418\u0422\u0410\u0426\u0418\u042F"
}
export declare class FindOneCourseParams {
    courseId: number;
}
export declare class AuidioDataDto {
    name: string;
    duration: number;
}
export declare class CreateCourseDto {
    name: string;
    description: string;
    type?: 'КУРС' | 'МЕДИТАЦИЯ';
    timeFrom: number;
    timeTo: number;
    cardLogoBgColor: string;
}
export declare class FilesOnCreateCourseDto {
    cardLogoUrl?: Express.Multer.File[];
    cardBgUrl?: Express.Multer.File[];
}
declare const SwaggerCreateCourseDto_base: import("@nestjs/common").Type<Partial<CreateCourseDto>>;
export declare class SwaggerCreateCourseDto extends SwaggerCreateCourseDto_base {
    cardLogoUrl?: Express.Multer.File[];
    cardBgUrl?: Express.Multer.File[];
}
export {};
