import { Prisma, User } from "@prisma/client"

export interface UserRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    getUserByEmail(email: string): Promise<User | null>
    getUserByUsername(username: string): Promise<User | null>
    getUserById(id: string): Promise<User | null>
    getAllUsers(): Promise<User[] | null>
    editUser(id: string, email: string, username: string): Promise<User | null>
    deleteUser(id: string): Promise<User>
}