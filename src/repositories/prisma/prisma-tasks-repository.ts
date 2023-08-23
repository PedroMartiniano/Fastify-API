import { Prisma, Tasks } from "@prisma/client";
import { TasksRepository } from "../tasks-repository";
import prisma from "../../lib/prisma";

export class PrismaTasksRepository implements TasksRepository {
    async createTask(data: Prisma.TasksUncheckedCreateInput): Promise<Tasks> {
        const task = await prisma.tasks.create({
            data
        })

        return task
    }

    async getTaskById(id: string): Promise<Tasks | null> {
        const task = await prisma.tasks.findUnique({
            where: {
                id
            }
        })

        return task
    }

    async deleteTaskById(id: string): Promise<Tasks | null> {
        const task = await prisma.tasks.update({
            where: {
                id
            },
            data : {
                status: 0
            }
        })

        return task
    }
}