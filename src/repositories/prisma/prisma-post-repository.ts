import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";

export class PrismaPostRepository {
    async create(data: Prisma.PostCreateInput) {
        const user = await prisma.post.create({
            data
        })
        return user
    }
}