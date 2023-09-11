import { Class, Prisma } from "@prisma/client";
import { ClassRepository } from "../class-repository";
import prisma from "../../lib/prisma";


export class PrismaClassRepository implements ClassRepository {
    async createClass(data: Prisma.ClassUncheckedCreateInput): Promise<Class | null> {
        try {
            const classCreate = await prisma.class.create({
                data
            })

            return classCreate
        } catch {
            return null
        }
    }
}