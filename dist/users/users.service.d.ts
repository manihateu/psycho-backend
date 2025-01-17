import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(name: string, email: string, password: string, role?: 'USER' | 'ADMIN'): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    findUserByEmail(email: string): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    getUserInfo(userId: number): Promise<{
        categories: {
            id: number;
            name: string;
            imageurl: string | null;
            bgcolor: string | null;
        }[];
        id: number;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
