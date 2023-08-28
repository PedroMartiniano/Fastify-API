import { AlumnAnswer } from "@prisma/client";
import { AlumnAnswersRepository } from "../repositories/alumnAnswer-repository";

type CreateAlumnAnswersRequest = {
    id_alumn: string,
    id_task: string,
    alumn_answer: string,
    is_right: boolean
}

export class AlumnAnswersClass {
    constructor(private alumnAnswersRepository: AlumnAnswersRepository) { }

    async executeCreateAlumnAnswer({ id_alumn, id_task, alumn_answer, is_right }: CreateAlumnAnswersRequest): Promise<AlumnAnswer> {
        const alumnAnswer: AlumnAnswer = await this.alumnAnswersRepository.createAlumnAnswers({ id_alumn, id_task, alumn_answer, is_right })

        return alumnAnswer
    }

    async executeGetAlumnAnswer(id_alumn: string, id_task: string): Promise<AlumnAnswer | null> {
        const alumnAnswer: AlumnAnswer | null = await this.alumnAnswersRepository.getAlumnAnswer(id_alumn, id_task)

        return alumnAnswer
    }

    async executeGetModuleAlumnAnswer(id_alumn: string, id_module: string): Promise<AlumnAnswer[] | null> {
        const moduleAlumnAnswers: AlumnAnswer[] | null = await this.alumnAnswersRepository.getModuleAlumnAnswers(id_alumn, id_module)

        return moduleAlumnAnswers
    }
}