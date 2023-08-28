import { PrismaCourseRepository } from "../../repositories/prisma/prisma-course-repository"
import { PrismaPurchaseRepository } from "../../repositories/prisma/prisma-purchase-repository"
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository"
import { PurchaseClassUseCase } from "../purchase"

export const makePurchaseUseCase = () => {
    const purchaseRepository = new PrismaPurchaseRepository
    const courseRepository = new PrismaCourseRepository
    const userRepository = new PrismaUserRepository
    const purchaseUseCase = new PurchaseClassUseCase(purchaseRepository, courseRepository, userRepository)

    return purchaseUseCase
}