import prisma from "../../lib/prisma";
import { Prisma } from "@prisma/client";
import { UserRepository } from "../user-repository";

export class PrismaUserRepository implements UserRepository {
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })
        return user
    }

    async getUserByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    }

    async getUserByUsername(username: string) {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })
        return user
    }

    async getUserById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return user
    }

    async getAllUsers() {
        const users = await prisma.user.findMany()

        return users
    }

    async editUser(id: string, email: string, username: string) {
        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                email,
                username
            }
        })

        return user
    }
}