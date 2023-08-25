import { describe, it, expect, beforeEach } from "vitest"
import { InMemoryStaffRepository } from "../../repositories/in-memory/in-memory-staff-repository"
import { StaffClass } from "../staff"
import { compare } from 'bcrypt'
import { AppError } from "../../errors/AppError"

let staffRepository: InMemoryStaffRepository
let staffUseCase: StaffClass

describe('Should test all use cases staff', async () => {
    beforeEach(() => {
        staffRepository = new InMemoryStaffRepository
        staffUseCase = new StaffClass(staffRepository)
    })

    it('should create a staff', async () => {
        const staff = await staffUseCase.executeCreateStaff({ cpf: '12345678910', email: 'jhondoe@gmail.com', username: 'jhondoe', password: '123456' })

        let password = staff.password

        expect(staff).toEqual({ id: '0', cpf: '12345678910', email: 'jhondoe@gmail.com', username: 'jhondoe', password, status: 1 })
    })

    it('should test if the password as been hashed right', async () => {
        const { password } = await staffUseCase.executeCreateStaff({ cpf: '12345678910', email: 'jhondoe@gmail.com', username: 'jhondoe', password: '123456' })


        const passwordIsRight = await compare('123456', password)

        expect(passwordIsRight).toBe(true)
    })

    it('should test if the cpf already exists when creating a staff', async () => {
        await staffUseCase.executeCreateStaff({ cpf: '12345678910', email: 'jhondoe@gmail.com', username: 'jhondoe', password: '123456' })

        expect(staffUseCase.executeCreateStaff({ cpf: '12345678910', email: 'jhondoe2@gmail.com', username: 'jhondoe2', password: '123456' })).rejects.toBeInstanceOf(AppError)
    })

    it('should test if the email already exists when creating a staff', async () => {
        await staffUseCase.executeCreateStaff({ cpf: '12345678910', email: 'jhondoe@gmail.com', username: 'jhondoe', password: '123456' })

        expect(staffUseCase.executeCreateStaff({ cpf: '12345678911', email: 'jhondoe@gmail.com', username: 'jhondoe2', password: '123456' })).rejects.toBeInstanceOf(AppError)
    })

    it('should test if the username already exists when creating a staff', async () => {
        await staffUseCase.executeCreateStaff({ cpf: '12345678910', email: 'jhondoe@gmail.com', username: 'jhondoe', password: '123456' })

        expect(staffUseCase.executeCreateStaff({ cpf: '12345678911', email: 'jhondoe2@gmail.com', username: 'jhondoe', password: '123456' })).rejects.toBeInstanceOf(AppError)
    })

    it('should get a staff by his id successfully', async () => {
        const staff = await staffUseCase.executeCreateStaff({ cpf: '12345678910', email: 'jhondoe@gmail.com', username: 'jhondoe', password: '123456' })

        const staffById = await staffUseCase.executeGetStaffById(staff.id)

        expect(staffById).toEqual({ id: '0', cpf: '12345678910', email: 'jhondoe@gmail.com', username: 'jhondoe', password: staff.password, status: 1 })
    })

    it('should get a staff that dont exists', async () => {
        const staffById = await staffUseCase.executeGetStaffById('invalid-id')

        expect(staffById).toBe(null)
    })

    it('should edit a staff successfully', async () => {
        const staff = await staffUseCase.executeCreateStaff({ cpf: '12345678910', email: 'jhondoe@gmail.com', username: 'jhondoe', password: '123456' })

        const staffEdited = await staffUseCase.executeEditStaff({ id: staff.id, email: 'emailedited@gmail.com', username: 'edited' })

        expect(staffEdited).toEqual({ id: staffEdited?.id, cpf: '12345678910', email: 'emailedited@gmail.com', username: 'edited', password: staffEdited?.password, status: 1 })
    })

    it('should edit a staff that dont exists', () => {
        expect(staffUseCase.executeEditStaff(
            {
                id: 'invalid-id',
                email: 'emailedited@gmail.com',
                username: 'edited'
            })
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should try edited a staff for a email thats from someone else', async () => {
        await staffUseCase.executeCreateStaff({ cpf: '12345678910', email: 'jhondoe@gmail.com', username: 'jhondoe', password: '123456' })

        const staff = await staffUseCase.executeCreateStaff({ cpf: '12345678911', email: 'jhondoe2@gmail.com', username: 'jhondoe2', password: '123456' })

        expect(staffUseCase.executeEditStaff({
            id: staff.id,
            email: 'jhondoe@gmail.com',
            username: 'edited'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should try edited a staff for a username thats from someone else', async () => {
        await staffUseCase.executeCreateStaff({ cpf: '12345678910', email: 'jhondoe@gmail.com', username: 'jhondoe', password: '123456' })

        const staff = await staffUseCase.executeCreateStaff({ cpf: '12345678911', email: 'jhondoe2@gmail.com', username: 'jhondoe2', password: '123456' })

        expect(staffUseCase.executeEditStaff({
            id: staff.id,
            email: 'edited@gmail.com',
            username: 'jhondoe'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should delete a staff', async () => {
        const staff = await staffUseCase.executeCreateStaff({ cpf: '12345678911', email: 'jhondoe@gmail.com', username: 'jhondoe', password: '123456' })

        const staffDeleted = await staffUseCase.executeDeleteStaff(staff.id)

        expect(staffDeleted.status).toBe(0)
    })
    it('should delete a staff that dont exist', async () => {

        expect(staffUseCase.executeDeleteStaff('invalid-id')).rejects.toBeInstanceOf(AppError)
    })

    it('should delete a staff thats already deleted', async () => {
        const staff = await staffUseCase.executeCreateStaff({ cpf: '12345678911', email: 'jhondoe@gmail.com', username: 'jhondoe', password: '123456' })

        await staffUseCase.executeDeleteStaff(staff.id)



        expect(staffUseCase.executeDeleteStaff(staff.id)).rejects.toBeInstanceOf(AppError)
    })

    it('should get all staffs', async () => {
        const staffs = await staffUseCase.executeGetAllStaffs()

        expect(staffs).toEqual([
            { id: '123', cpf: '12345678910', email: 'staff@gmail.com', username: 'staff1', password: '123456', status: 1 },
            { id: '321', cpf: '12345678911', email: 'staff2@gmail.com', username: 'staff2', password: '123456', status: 1 }
        ])
    })
})