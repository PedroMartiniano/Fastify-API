import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAlumnAnswerUseCase } from "../../use-cases/factory/make-AlumnAnswer-use-casae";
import { makeTasksUseCase } from "../../use-cases/factory/make-task-use-case";
import { AppError } from "../../errors/AppError";
import { makeUserUseCase } from "../../use-cases/factory/make-user-use-case";


export const createAlumnAnswerController = async (req: FastifyRequest, rep: FastifyReply) => {
    const alumnAnswerSchema = z.object({
        id_alumn: z.string(),
        alumn_answer: z.string()
    })

    const idTaskSchema = z.object({
        id_task: z.string()
    })

    const { id_alumn, alumn_answer } = alumnAnswerSchema.parse(req.body)
    const { id_task } = idTaskSchema.parse(req.params)

    const taskUseCase = makeTasksUseCase()

    let task
    try {
        task = await taskUseCase.executeGetTaskById(id_task)
    } catch (e) {
        throw new AppError('something went wrong when catching task')
    }

    if (!task) {
        throw new AppError('something went wrong when catching task')
    }

    const alumnUseCase = makeUserUseCase()

    let alumn
    try {
        alumn = await alumnUseCase.executeGetUserById(id_alumn)
    } catch (e) {
        throw new AppError('something went wrong with the user login')
    }

    if (!alumn) {
        throw new AppError('something went wrong with the user login')
    }
    const alumnAnswersUseCase = makeAlumnAnswerUseCase()

    let isAlumnAlreadyAnswered
    try {
        isAlumnAlreadyAnswered = await alumnAnswersUseCase.executeGetAlumnAnswer(id_alumn, id_task)
    } catch (e) {
        throw new AppError('Server Error', 500)
    }

    if (isAlumnAlreadyAnswered) {
        throw new AppError('Alumn Already answered this task', 400)
    }

    let is_right: boolean
    (task.right_answer === alumn_answer) ? is_right = true : is_right = false

    let alumnAnswer
    try {
        alumnAnswer = await alumnAnswersUseCase.executeCreateAlumnAnswer({ id_alumn, id_task, alumn_answer, is_right })
    } catch (e) {
        throw new AppError('Something went wrong')
    }

    return rep.status(201).send(alumnAnswer)
}

export const getModuleAlumnAnswersController = async (req: FastifyRequest, rep: FastifyReply) => {
    const idAlumnSchema = z.object({
        id_alumn: z.string()
    })

    const idModuleSchema = z.object({
        id_module: z.string()
    })

    const { id_alumn } = idAlumnSchema.parse(req.body)
    const { id_module } = idModuleSchema.parse(req.params)

    const alumnAnswersUseCase = makeAlumnAnswerUseCase()

    let answers
    try {
        answers = await alumnAnswersUseCase.executeGetModuleAlumnAnswer(id_alumn, id_module)
    } catch (e) {
        throw new AppError('Something went wrong')
    }

    return rep.status(200).send(answers)
}

export const alumnAverageController = async (req: FastifyRequest, rep: FastifyReply) => {
    const idAlumnSchema = z.object({
        id_alumn: z.string()
    })

    const idModuleSchema = z.object({
        id_module: z.string()
    })

    const { id_alumn } = idAlumnSchema.parse(req.body)
    const { id_module } = idModuleSchema.parse(req.params)

    const alumnAnswersUseCase = makeAlumnAnswerUseCase()

    let alumnAnswers
    try {
        alumnAnswers = await alumnAnswersUseCase.executeGetModuleAlumnAnswer(id_alumn, id_module)
    } catch (e) {
        throw new AppError("something went wrong", 500)
    }

    let count = 0
    alumnAnswers?.forEach((answer) => (answer.is_right) && (count++))

    return rep.status(200).send({ Alumn_Average: `${count}/${alumnAnswers?.length}` })
}