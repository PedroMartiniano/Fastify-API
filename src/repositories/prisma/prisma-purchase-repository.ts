import { Prisma, Purchase } from "@prisma/client"
import { PurchaseRepository } from "../purchase-repository"
import prisma from "../../lib/prisma"

export class PrismaPurchaseRepository implements PurchaseRepository {
    async createPurchase(data: Prisma.PurchaseUncheckedCreateInput): Promise<Purchase> {
        const purchaseCreate = await prisma.purchase.create({
            data
        })

        return purchaseCreate
    }

    async getPurchase(id_user: string, id_course: string): Promise<Purchase | null> {
        const purchaseGet = await prisma.purchase.findFirst({
            where: {
                id_user,
                id_course,
                status: 1,
            }
        })

        return purchaseGet
    }

    async getCoursePurchase(id_course: string): Promise<Purchase[] | null> {
        const coursePuchaseGet = await prisma.purchase.findMany({
            where: {
                id_course
            }
        })

        return coursePuchaseGet
    }

    async getUserPurchase(id_user: string): Promise<Purchase[] | null> {
        const userPurchaseGet = await prisma.purchase.findMany({
            where: {
                id_user
            }
        })

        return userPurchaseGet
    }

    async cancelPurchase(id: string): Promise<Purchase> {
        const cancelPurchase = await prisma.purchase.update({
            where: {
                id
            },
            data: {
                status: 0
            }
        })

        return cancelPurchase
    }
}