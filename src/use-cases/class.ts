import { Class, Prisma } from "@prisma/client";
import { ClassRepository } from "../repositories/class-repository";

type ClassRequest = {
    name: string,
    description: string | null,
    link: string,
    id_module: string
}

export class ClassUseCase {
    constructor(private classRepository: ClassRepository) { }

    async executeCreateClass(data: Prisma.ClassUncheckedCreateInput): Promise<Class | null> {
        const classCreate = await this.classRepository.createClass(data)

        return classCreate
    }
}