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

    async getUserById(id: string): Promise<User | null> {
        const user = this.items.find(item => item.id === id)

        if (!user) {
            return null
        }

        return user
    }

    async getAllUsers(): Promise<User[] | null> {
        const users = this.items

        return users
    }

    async editUser(id: string, email: string, username: string): Promise<User | null> {
        const user = this.items.find((user) => user.id === id)
        const indexUser = this.items.findIndex((user) => user.id === id)

        if(!user){
            return null
        }

        const newUser = {
            ...user,
            email,
            username
        }

        const userArray = this.items[indexUser] = newUser

        return userArray
    }

}