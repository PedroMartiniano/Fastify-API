import { Staff } from "@prisma/client";
import { hash } from "bcrypt"
import { StaffRepository } from "../repositories/staff-repository";
import { AppError } from "../errors/AppError";


interface StaffRequest {
    cpf: string,
    email: string,
    username: string,
    password: string
}

interface EditStaffRequest {
    id: string,
    email: string,
    username: string
}

export class StaffClass {
    constructor(private staffRepository: StaffRepository) { }

    async executeCreateStaff({ cpf, email, username, password }: StaffRequest): Promise<Staff> {

        const getStaffByEmail = await this.staffRepository.getStaffByEmail(email)
        const getStaffByUsername = await this.staffRepository.getStaffByUsername(username)
        const getStaffByCpf = await this.staffRepository.getStaffByCpf(cpf)

        if (getStaffByEmail || getStaffByUsername || getStaffByCpf) {
            throw new AppError('staff already exists')
        }

        const hashPassword = await hash(password, 4)
        const staff = await this.staffRepository.createStaff({ cpf, email, username, password: hashPassword })

        return staff
    }

    async executeGetStaffById(id: string): Promise<Staff | null> {
        const getStaffById = await this.staffRepository.getStaffById(id)

        return getStaffById
    }

    async executeEditStaff({ id, email, username }: EditStaffRequest): Promise<Staff | null> {
        const getStaffById = await this.staffRepository.getStaffById(id)

        if (!getStaffById) {
            throw new AppError("Staff dont exists")

        }

        const getStaffByEmail = await this.staffRepository.getStaffByEmail(email)
        const getStaffByUsername = await this.staffRepository.getStaffByUsername(username)

        if (getStaffByEmail) {
            if (!(getStaffByEmail.id === id)) {
                throw new AppError("Staff already exists")
            }
        }

        if (getStaffByUsername) {
            if (!(getStaffByUsername.id === id)) {
                throw new AppError("Staff already exists")
            }
        }

        const staff = await this.staffRepository.editStaff(id, email, username)

        return staff
    }

    async executeDeleteStaff(id: string): Promise<Staff> {
        const staffId = await this.staffRepository.getStaffById(id)

        if (!staffId) {
            throw new AppError('staff dont exists')
        }

        if (staffId.status === 0) {
            throw new AppError('staff already deleted')
        }

        const staff = await this.staffRepository.deleteStaff(id)

        return staff
    }

    async executeGetAllStaffs(): Promise<Staff[] | null> {
        const staffs = await this.staffRepository.getAllStafs()

        return staffs
    }
}