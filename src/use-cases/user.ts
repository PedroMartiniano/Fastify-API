import { hash } from "bcrypt"
import { AppError } from "../errors/AppError"
import { User } from "@prisma/client"
import { UserRepository } from "../repositories/user-repository"

interface CreateUserRequest {
    email: string,
    username: string,
    first_name: string,
    last_name: string
    image: string,
    password: string
}
interface EditUserRequest {
    sub: string
    email: string,
    username: string,
}

interface UserResponse {
    user: User
}

interface UserGetMeRequest {
    userId: string
}

export class UserClass {
    constructor(private userRepository: UserRepository) { }

    async executeCreateUser({ email, username, first_name, last_name, image, password }: CreateUserRequest): Promise<User> {

        const userWithSameEmail = await this.userRepository.getUserByEmail(email)
        const userWithSameUsername = await this.userRepository.getUserByUsername(username)

        if (userWithSameEmail || userWithSameUsername) {
            throw new AppError('User already exists.')
        }

        const hashPassword = await hash(password, 4)
        const user = await this.userRepository.create({ email, username, first_name, last_name, image, password: hashPassword })
        
        return user 
    }

    async executeGetUserById(id: string): Promise<User | null> {
        const user = await this.userRepository.getUserById(id)

        return user
    }

    async executeGetAllUsers(): Promise<User[] | null> {
        const users = await this.userRepository.getAllUsers()
        return users
    }

    async executeEditUser({ sub, email, username }: EditUserRequest): Promise<UserResponse | null> {

        const userExist = await this.userRepository.getUserById(sub)

        if (!userExist) {
            throw new AppError('User not found')
        }

        if (userExist.status === 0) {
            throw new AppError('User is deleted')
        }

        const userEmail = await this.userRepository.getUserByEmail(email)

        if (userEmail) {
            if (!(userEmail.id === sub)) {
                throw new AppError('Email already exists')
            }
        }

        const user = await this.userRepository.editUser(sub, email, username)

        if (!user) {
            return null
        }

        return { user }
    }

    async executeDeleteUser(id: string): Promise<User> {
        const userId = await this.userRepository.getUserById(id)

        if (!userId) {
            throw new AppError('User dont exist')
        }

        if (userId.status === 0) {
            throw new AppError('User already deleted')
        }

        const user = await this.userRepository.deleteUser(id)

        return user
    }

    async executeGetMe({ userId }: UserGetMeRequest): Promise<User> {
        const user = await this.userRepository.getUserById(userId)

        if (!user) {
            throw new AppError('User not found')
        }

        return user
    }
}