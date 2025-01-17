import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './categories.dto';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    getAllCategories(): Promise<{
        id: number;
        name: string;
        imageurl: string | null;
        bgcolor: string | null;
    }[]>;
    assignCategoriesToUser(req: any, { categoryIds }: {
        categoryIds: number[];
    }): Promise<{
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
    createCategory({ name, bgcolor }: CreateCategoryDto, file: any): Promise<{
        id: number;
        name: string;
        imageurl: string | null;
        bgcolor: string | null;
    }>;
}
