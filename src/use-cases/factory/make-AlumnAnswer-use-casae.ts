import { PrismaAlumnAnswerRepository } from "../../repositories/prisma/prisma-alumnAnswer-repository"
import { AlumnAnswersClass } from "../alumnAnswers"

export const makeAlumnAnswerUseCase = () => {
    const alumnAnswerRepository = new PrismaAlumnAnswerRepository
    const alumnAnswerUseCase = new AlumnAnswersClass(alumnAnswerRepository)

    return alumnAnswerUseCase
}