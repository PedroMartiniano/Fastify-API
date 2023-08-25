import { Prisma, Staff } from "@prisma/client";

export interface StaffRepository {
    createStaff(data: Prisma.StaffCreateInput): Promise<Staff>
    getStaffByUsername(username: string): Promise<Staff | null>
    getStaffByEmail(email: string): Promise<Staff | null>
    getStaffByCpf(cpf: string): Promise<Staff | null>
    getStaffById(id: string): Promise<Staff | null>
    editStaff(id: string, email: string, username: string): Promise<Staff | null>
    deleteStaff(id: string): Promise<Staff>
    getAllStafs(): Promise<Staff[] | null>
}