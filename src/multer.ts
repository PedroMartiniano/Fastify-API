import multer from "fastify-multer"
import { AppError } from "./errors/AppError"
import { FastifyRequest } from "fastify"

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/images')
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})