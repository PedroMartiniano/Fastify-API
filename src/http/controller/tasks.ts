import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeTasksUseCase } from "../../use-cases/factory/make-task-use-case";
import { AppError } from "../../errors/AppError";
import { makeAlumnAnswerUseCase } from "../../use-cases/factory/make-AlumnAnswer-use-casae";

export const createTaskController = async (req: FastifyRequest, rep: FastifyReply) => {
    const taskSchema = z.object({
        question: z.string(),
        answers: z.string(),
        right_answer: z.string()
    })
    const idModule = z.object({
        id_module: z.string()
    })

    const { question, answers, right_answer } = taskSchema.parse(req.body)
    const { id_module } = idModule.parse(req.params)

    const createTasksUseCase = makeTasksUseCase()

    let tasks
    try {
        tasks = await createTasksUseCase.executeCreateTasks({ question, answers, right_answer, id_module })
    } catch (e) {
        throw new AppError('something went wrong', 400)
    }

    return rep.status(201).send(tasks)
}

export const getTaskByIdController = async (req: FastifyRequest, rep: FastifyReply) => {
    const idSchema = z.object({
        id: z.string()
    })

    const { id } = idSchema.parse(req.params)

    const getTaskUseCase = makeTasksUseCase()

    let task
    try {
        task = await getTaskUseCase.executeGetTaskById(id)
    } catch (e) {
        throw new AppError('Something went wrong', 400)
    }

    return rep.status(200).send(task)
}

export const deleteTaskByIdController = async (req: FastifyRequest, rep: FastifyReply) => {
    const idSchema = z.object({
        id: z.string()
    })

    const { id } = idSchema.parse(req.params)

    const deleteTask = makeTasksUseCase()

    let task
    try {
        task = await deleteTask.executeDeleteTaskById(id)
    } catch (e) {
        throw new AppError('something went wrong', 500)
    }

    return rep.status(200).send({ task, message: 'Deleted' })
}

export const getTasksByIdModuleController = async (req: FastifyRequest, rep: FastifyReply) => {
    const idModuleSchema = z.object({
        id_module: z.string()
    })

    const { id_module } = idModuleSchema.parse(req.params)

    const getTasksByIdModuleUseCase = makeTasksUseCase()

    let tasks
    try {
        tasks = await getTasksByIdModuleUseCase.getTaksByIdModule(id_module)
    } catch (e) {
        throw new AppError('Something went wrong',)
    }

    return rep.status(200).send(tasks)
}

export const getNextTaskController = async (req: FastifyRequest, rep: FastifyReply) => {
    const idModuleSchema = z.object({
        id_module: z.string()
    })
    const idUserSchema = z.object({
        id_alumn: z.string()
    })

    const { id_module } = idModuleSchema.parse(req.params)
    const { id_alumn } = idUserSchema.parse(req.body)

    const taskUseCase = makeTasksUseCase()

    let moduleTasks
    try {
        moduleTasks = await taskUseCase.getTaksByIdModule(id_module)
    } catch (e) {
        throw new AppError('something went wrong catching module tasks')
    }

    if (!moduleTasks) {
        return rep.status(200).send({ message: "theres no tasks in this module" })
    }

    const alumnAnswersUseCase = makeAlumnAnswerUseCase()

    console.log(moduleTasks)
    let alumnAnswers
    try {
        alumnAnswers = await alumnAnswersUseCase.executeGetModuleAlumnAnswer(id_alumn, id_module)
    } catch (e) {
        console.log(`ERRO: ${e}`)
        throw new AppError('something went wrong')
    }

    if (!alumnAnswers) {
        return rep.status(200).send(moduleTasks[0])
    }

    if (moduleTasks[alumnAnswers.length]) {
        return rep.status(200).send(moduleTasks[alumnAnswers.length])
    }
    return rep.status(200).send(null)
}