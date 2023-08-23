import { PrismaTasksRepository } from "../../repositories/prisma/prisma-tasks-repository"
import { TasksClassUseCase } from "../tasks"

export const makeTasksUseCase = () => {
    const tasksRepository = new PrismaTasksRepository
    const makeTasks = new TasksClassUseCase(tasksRepository)

    return makeTasks
}