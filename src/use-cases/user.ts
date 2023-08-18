import { hash } from "bcrypt"
import { AppError } from "../errors/AppError"
import { User } from "@prisma/client"

interface CreateUserRequest {
    email: string,
    username: string,
    password: string
}

interface UserResponse {
    user: User
}

export class UserClass {
    constructor(private userRepository: any) { }

    async executeCreateUser({ email, username, password }: CreateUserRequest): Promise<UserResponse> {

        const userWithSameEmail = await this.userRepository.getUserByEmail(email)
        const userWithSameUsername = await this.userRepository.getUserByUsername(username)

        if (userWithSameEmail || userWithSameUsername) {
            throw new AppError('User already exists.')
        }

        const hashPassword = await hash(password, 4)

        const user = await this.userRepository.create({ email, username, password: hashPassword })
        return { user }
    }

    async executeGetUserById(id: string): Promise<UserResponse> {
        const user = await this.userRepository.getUserById(id)

        return { user }
    }

    async executeGetAllUsers(): Promise<User[]> {
        const users = await this.userRepository.getAllUsers()

        return users
    }
}