import { Purchase } from "@prisma/client"
import { CourseRepository } from "../repositories/course-repository"
import { PurchaseRepository } from "../repositories/purchase-repository"
import { AppError } from "../errors/AppError"
import { UserRepository } from "../repositories/user-repository"

type PurchaseRequest = {
    id_user: string,
    id_course: string
}

export class PurchaseClassUseCase {
    constructor(private purchaseRepository: PurchaseRepository, private courseRepository: CourseRepository, private userRepository: UserRepository) { }

    async executeCreatePurchase({ id_user, id_course }: PurchaseRequest): Promise<Purchase> {
        const getCourseById = await this.courseRepository.getCourseById(id_course)

        if (!getCourseById) {
            throw new AppError(`Course dont exist`)
        }

        const getUserById = await this.userRepository.getUserById(id_user)

        if (!getUserById) {
            throw new AppError(`User dont exist`)
        }

        const purchaseCreate = await this.purchaseRepository.createPurchase({ id_user, id_course })

        return purchaseCreate
    }

    async executeGetPurchase({id_user, id_course}: PurchaseRequest): Promise<Purchase | null> {
        const getCourseById = await this.courseRepository.getCourseById(id_course)

        if (!getCourseById) {
            throw new AppError(`Course dont exist`)
        }

        const getUserById = await this.userRepository.getUserById(id_user)

        if (!getUserById) {
            throw new AppError(`User dont exist`)
        }

        const purchaseGet = await this.purchaseRepository.getPurchase(id_user, id_course)

        return purchaseGet
    }
    
    async executeGetCoursePurchase (id_course: string): Promise<Purchase[] | null> {
        const getCourseById = await this.courseRepository.getCourseById(id_course)

        if (!getCourseById) {
            throw new AppError(`Course dont exist`)
        }

        const getCoursePurchase = await this.purchaseRepository.getCoursePurchase(id_course)

        return getCoursePurchase
    }

    async executeGetUserPurchase (id_user: string): Promise<Purchase[] | null> {
        const getUserById = await this.userRepository.getUserById(id_user)

        if (!getUserById) {
            throw new AppError(`User dont exist`)
        }

        const getUserPurchase = await this.purchaseRepository.getUserPurchase(id_user)

        return getUserPurchase
    }

    async executeCancelPurchase (id: string): Promise<Purchase> {
        // const getCourseById = await this.courseRepository.getCourseById(id_course)

        // if (!getCourseById) {
        //     throw new AppError(`Course dont exist`)
        // }

        // const getUserById = await this.userRepository.getUserById(id_user)

        // if (!getUserById) {
        //     throw new AppError(`User dont exist`)
        // }

        const cancelPurchase = await this.purchaseRepository.cancelPurchase(id)

        return cancelPurchase
    }
}