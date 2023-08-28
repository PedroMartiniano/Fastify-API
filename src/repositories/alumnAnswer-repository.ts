import { AlumnAnswer, Prisma } from "@prisma/client";

export interface AlumnAnswersRepository {
    createAlumnAnswers(data: Prisma.AlumnAnswerUncheckedCreateInput): Promise<AlumnAnswer>
    getAlumnAnswer(id_alumn: string, id_task: string): Promise<AlumnAnswer | null>
    getModuleAlumnAnswers(id_alumn: string, id_module: string): Promise<AlumnAnswer[] | null>
}