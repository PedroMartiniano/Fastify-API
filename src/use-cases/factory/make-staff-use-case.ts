import { PrismaStaffRepository } from "../../repositories/prisma/prisma-staff-repository"
import { StaffClass } from "../staff"

export const makeStaffUseCase = () => {
    const staffRepository = new PrismaStaffRepository
    const staffUseCase = new StaffClass(staffRepository)

    return staffUseCase
}