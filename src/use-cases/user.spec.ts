import { expect, describe, it, beforeEach } from 'vitest'
import { UserClass } from './user'
import { compare } from 'bcrypt'
import { AppError } from '../errors/AppError'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'

let usersRepository: InMemoryUserRepository
let registerUseCase: UserClass

describe('User use case tests', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUserRepository
        registerUseCase = new UserClass(usersRepository)
    })
    it('should check if the password is been hashed', async () => {
        const { user } = await registerUseCase.executeCreateUser({
            email: "jhondoeExample@example.com",
            username: 'JhonDoeExample',
            password: '1234567'
        })

        const isPasswordCorrect = await compare('1234567', user.password)

        expect(isPasswordCorrect).toBe(true)
    })

    it('should check if the email has been created', async () => {
        await registerUseCase.executeCreateUser({
            email: "jhondoe@example.com",
            username: 'JhonDoe',
            password: '1234567'
        })

        await expect(() => registerUseCase.executeCreateUser({
            email: "jhondoe@example.com",
            username: 'JhonDoe2',
            password: '1234567'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should check if the username has been created', async () => {
        await registerUseCase.executeCreateUser({
            email: "jhondoe@example.com",
            username: 'JhonDoe',
            password: '1234567'
        })

        await expect(() => registerUseCase.executeCreateUser({
            email: "jhondoe2@example.com",
            username: 'JhonDoe',
            password: '1234567'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should get a user by his id', () => {


    })

    it('should create a user successfully', async () => {
        const { user } = await registerUseCase.executeCreateUser({
            email: "jhondoe@example.com",
            username: 'JhonDoe',
            password: '1234567'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should get a user by id', async () => {
        const { user } = await registerUseCase.executeCreateUser({
            email: "jhondoe@example.com",
            username: 'JhonDoe',
            password: '1234567'
        })

        const userObj = await registerUseCase.executeGetUserById(user.id)


        expect(userObj?.id).toEqual(expect.any(String))
    })
    it('should not get a user by id', async () => {
        const user = await registerUseCase.executeGetUserById('not-valid-id')

        expect(user).toBe(null)
    })

    it('should get all users', async () => {
        const users = await registerUseCase.executeGetAllUsers()

        expect(users).toEqual([
            { id: '123', email: 'pedro@gmail.com', username: 'pedro', password: '123456' },
            { id: '321', email: 'pedro2@gmail.com', username: 'pedro2', password: '123456' }
        ])
    })

    it('should edit a user', async () => {
        const { user } = await registerUseCase.executeCreateUser({
            email: "jhondoe@example.com",
            username: 'JhonDoe',
            password: '1234567'
        })

        const edit = await registerUseCase.executeEditUser({
            id: user.id,
            email: 'editado@gmail.com',
            username: 'editado'
        })
        
        let password = edit?.user.password
        
        expect(edit).toEqual({user: {id: 'user-1', email: 'editado@gmail.com', username: 'editado', password: password}})
    })
})