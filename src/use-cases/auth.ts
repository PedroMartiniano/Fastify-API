import { compare } from "bcrypt";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../repositories/user-repository";
import { User } from "@prisma/client";

type AuthRequest = {
    email: string,
    password: string
}

export class AuthenticateUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute({ email, password }: AuthRequest): Promise<User> {
        const user = await this.userRepository.getUserByEmail(email)

        if (!user) {
            throw new AppError('Email or password invalid')
        }

        const doPasswordMatch = await compare(password, user.password)

        if (!doPasswordMatch) {
            throw new AppError('Email or password invalid')
        }

        return user
    }
}