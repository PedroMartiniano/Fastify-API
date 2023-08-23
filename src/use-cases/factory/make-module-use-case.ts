import { PrismaCourseRepository } from "../../repositories/prisma/prisma-course-repository"
import { PrismaModuleRepository } from "../../repositories/prisma/prisma-module-repository"
import { ModuleClassUseCase } from "../module"

export const makeModuleUseCase = () => {
    const moduleRepository = new PrismaModuleRepository
    const courseRepository = new PrismaCourseRepository
    const moduleUseCase = new ModuleClassUseCase(moduleRepository, courseRepository)

    return moduleUseCase
}