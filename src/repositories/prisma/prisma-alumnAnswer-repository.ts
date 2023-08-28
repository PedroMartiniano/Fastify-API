import { AlumnAnswer, Prisma } from "@prisma/client";
import { AlumnAnswersRepository } from "../alumnAnswer-repository";
import prisma from "../../lib/prisma";

export class PrismaAlumnAnswerRepository implements AlumnAnswersRepository {
    async createAlumnAnswers(data: Prisma.AlumnAnswerUncheckedCreateInput): Promise<AlumnAnswer> {
        const alumnAnswer = prisma.alumnAnswer.create({
            data
        })

        return alumnAnswer
    }

    async getAlumnAnswer(id_alumn: string, id_task: string): Promise<AlumnAnswer | null> {
        const alumnAnswer = prisma.alumnAnswer.findFirst({
            where: {
                id_alumn,
                id_task
            }
        })

        return alumnAnswer
    }

    async getModuleAlumnAnswers(id_alumn: string, id_module: string): Promise<AlumnAnswer[] | null> {
        const alumnAnswer: AlumnAnswer[] = await prisma.$queryRaw`
        SELECT a.id id_alumnAnswer, a.id_alumn, a.id_task, a.alumn_answer, a.is_right, a.answer_date
        FROM tasks t
        INNER JOIN alumnanswer a ON t.id = a.id_task
        WHERE t.id_module = ${id_module} AND a.id_alumn = ${id_alumn}
        `
        return alumnAnswer
    }
}