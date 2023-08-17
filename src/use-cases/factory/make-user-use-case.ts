import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository"
import { UserClass } from "../user"

export function makeUserUseCase(){
    const userRepository = new PrismaUserRepository
    const createUser = new UserClass(userRepository)
    
    return createUser
}