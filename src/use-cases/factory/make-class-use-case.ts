import { PrismaClassRepository } from "../../repositories/prisma/prisma-class-repository"
import { ClassUseCase } from "../class"

export const MakeClassUseCase = () => {
    const classRepository = new PrismaClassRepository
    const classUseCase = new ClassUseCase(classRepository)

    return classUseCase
}