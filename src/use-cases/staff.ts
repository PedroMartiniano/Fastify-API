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

    async executeEditStaff({ id, email, username }: EditStaffRequest): Promise<Staff> {
        const getStaffByEmail = await this.staffRepository.getStaffByEmail(email)
        const getStaffByUsername = await this.staffRepository.getStaffByUsername(username)

        if (getStaffByEmail) {
            if (!(getStaffByEmail.id === id)) {
                throw new AppError("user already exists")
            }
        }

        if(getStaffByUsername){
            if(!(getStaffByUsername.id === id)){
                throw new AppError("user already exists")
            }
        }

        const staff = await this.staffRepository.editStaff(id, email, username)

        return staff
    }
}