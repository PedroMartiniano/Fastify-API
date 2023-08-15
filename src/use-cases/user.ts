import { hash } from "bcrypt"

interface CreateUserRequest {
    email: string,
    username: string,
    password: string
}

export class CreateUser{
    constructor(private userRepository: any){}

    async execute({email, username, password}: CreateUserRequest){

        const user = await this.userRepository.getUserByEmail(email)
        
        if(user){
            throw new Error('User already exists.')
        }
        
        const hashPassword = await hash(password, 4)
        
        await this.userRepository.create({email, username, password: hashPassword})
    }
}