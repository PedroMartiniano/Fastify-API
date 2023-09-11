import { Class, Prisma } from "@prisma/client";

export interface ClassRepository {
    createClass(data: Prisma.ClassUncheckedCreateInput): Promise<Class | null>
}