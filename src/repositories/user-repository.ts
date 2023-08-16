import { Prisma, User } from "@prisma/client"

export interface UserRepository {
    // findById(id: string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
    getUserByEmail(email: string): Promise<User | null>
    getUserByUsername(username: string): Promise<User | null>
}