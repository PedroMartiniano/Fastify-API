import { test, expect, describe, it, beforeEach } from 'vitest'
import { CreateUser } from './user'
import { compare } from 'bcrypt'
import { AppError } from '../errors/AppError'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'

let usersRepository: InMemoryUserRepository
let registerUseCase: CreateUser

describe('User use case tests', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUserRepository
        registerUseCase = new CreateUser(usersRepository)
    })
    it('should check if the password is been hashed', async () => {
        const { user } = await registerUseCase.execute({ email: "jhondoeExample@example.com", username: 'JhonDoeExample', password: '1234567' })

        const isPasswordCorrect = await compare('1234567', user.password)

        expect(isPasswordCorrect).toBe(true)
    })

    it('should check if the email has been created', async () => {

        await registerUseCase.execute({ email: "jhondoe@example.com", username: 'JhonDoe', password: '1234567' })

        await expect(() => registerUseCase.execute({
            email: "jhondoe@example.com",
            username: 'JhonDoe2',
            password: '1234567'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should check if the username has been created', async () => {

        await registerUseCase.execute({ email: "jhondoe@example.com", username: 'JhonDoe', password: '1234567' })

        await expect(() => registerUseCase.execute({
            email: "jhondoe2@example.com",
            username: 'JhonDoe',
            password: '1234567'
        })).rejects.toBeInstanceOf(AppError)
    })
})