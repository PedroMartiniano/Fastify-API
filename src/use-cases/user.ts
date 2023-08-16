import { hash } from "bcrypt"
import { AppError } from "../errors/AppError"
import { User } from "@prisma/client"

interface CreateUserRequest {
    email: string,
    username: string,
    password: string
}

interface CreateUserResponse {
    user: User
}

export class CreateUser {
    constructor(private userRepository: any) { }

    async execute({ email, username, password }: CreateUserRequest): Promise<CreateUserResponse> {

        const userWithSameEmail = await this.userRepository.getUserByEmail(email)
        const userWithSameUsername = await this.userRepository.getUserByUsername(username)

        if (userWithSameEmail || userWithSameUsername) {
            throw new AppError('User already exists.')
        }

        const hashPassword = await hash(password, 4)

        const user = await this.userRepository.create({ email, username, password: hashPassword })
        return { user }
    }
}