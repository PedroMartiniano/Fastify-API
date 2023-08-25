import { Prisma, Staff } from "@prisma/client";
import { StaffRepository } from "../staff-repository";

export class InMemoryStaffRepository implements StaffRepository {
    private items: Staff[] = []
    private staffItems: Staff[] = [
        { id: '123', cpf: '12345678910', email: 'staff@gmail.com', username: 'staff1', password: '123456', status: 1 },
        { id: '321', cpf: '12345678911', email: 'staff2@gmail.com', username: 'staff2', password: '123456', status: 1 }
    ]

    async createStaff(data: Prisma.StaffCreateInput): Promise<Staff> {
        const staff = {
            id: `${this.items.length}`,
            cpf: data.cpf,
            email: data.email,
            username: data.username,
            password: data.password,
            status: 1
        }

        this.items.push(staff)

        return staff
    }

    async getStaffByUsername(username: string): Promise<Staff | null> {
        const staff = this.items.find(staff => staff.username === username)

        if (!staff) {
            return null
        }

        return staff
    }

    async getStaffByEmail(email: string): Promise<Staff | null> {
        const staff = this.items.find(staff => staff.email === email)

        if (!staff) {
            return null
        }

        return staff
    }

    async getStaffByCpf(cpf: string): Promise<Staff | null> {
        const staff = this.items.find(staff => staff.cpf === cpf)

        if (!staff) {
            return null
        }

        return staff
    }

    async getStaffById(id: string): Promise<Staff | null> {
        const staff = this.items.find(staff => staff.id === id)

        if (!staff) {
            return null
        }

        return staff
    }

    async editStaff(id: string, email: string, username: string): Promise<Staff | null> {
        let staff = this.items.find(staff => staff.id === id)
        const IndexStaff = this.items.findIndex(staff => staff.id === id)

        if (!staff) {
            return null
        }

        staff = {
            ...staff,
            email,
            username
        }

        this.items[IndexStaff] = staff

        const newStaff = this.items[IndexStaff]

        return newStaff
    }

    async deleteStaff(id: string): Promise<Staff> {
        let indexStaff = this.items.findIndex(staff => staff.id === id)

        let staff = this.items[indexStaff]

        staff = {
            ...staff,
            status: 0
        }

        this.items[indexStaff] = staff

        const staffDeleted = this.items[indexStaff]

        return staffDeleted
    }

    async getAllStafs(): Promise<Staff[] | null> {
        const staffs = this.staffItems

        return staffs
    }
}