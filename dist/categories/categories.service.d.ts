import { PrismaService } from '../prisma/prisma.service';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllCategories(): Promise<{
        id: number;
        name: string;
        imageurl: string | null;
        bgcolor: string | null;
    }[]>;
    addCategoryToUser(userId: number, categoryIds: number[]): Promise<{
        categories: {
            id: number;
            name: string;
            imageurl: string | null;
            bgcolor: string | null;
        }[];
    } & {
        id: number;
        email: string;
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    createCategory(name: string, imageUrl: string, bgcolor: string): Promise<{
        id: number;
        name: string;
        imageurl: string | null;
        bgcolor: string | null;
    }>;
}
