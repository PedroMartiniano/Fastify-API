import { Prisma, Purchase } from "@prisma/client";

export interface PurchaseRepository {
    createPurchase(data: Prisma.PurchaseUncheckedCreateInput): Promise<Purchase>
    getPurchase(id_user: string, id_course: string): Promise<Purchase | null>
    getCoursePurchase(id_course: string): Promise<Purchase[] | null>
    getUserPurchase(id_user: string): Promise<Purchase[] | null>
    cancelPurchase(id: string): Promise<Purchase>
}