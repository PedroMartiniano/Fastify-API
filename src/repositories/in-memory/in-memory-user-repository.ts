import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../user-repository";

export class InMemoryUserRepository implements UserRepository {
    public items: User[] = []

    async getUserByEmail(email: string): Promise<User | null> {
        const user = this.items.find(item => item.email === email)

        if (!user) {
            return null
        }

        return user
    }

    async getUserByUsername(username: string): Promise<User | null> {
        const user = this.items.find(item => item.username === username)

        if (!user) {
            return null
        }

        return user
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: 'user-1',
            username: data.username,
            email: data.email,
            password: data.password
        }

        this.items.push(user)

        return user
    }
}