import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
export declare class UsersController {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    getUser(req: any): Promise<{
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
