import fastify from "fastify"
import cors from "@fastify/cors"
import { appRoutes } from "./http/routes"
import { ZodError } from "zod"
import { env } from "./env"
import { AppError } from "./errors/AppError"
import fastifyJwt from "@fastify/jwt"
import fastifyCookie from "@fastify/cookie"
import multer from "fastify-multer"
import { storage } from "./multer"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui";
import { swaggerOptions, swaggerUiOptions } from "./swagger"

const app = fastify()

app.register(multer.contentParser)

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const types = ['svg', 'jpg', 'png', 'gif']

        let [, filename] = file.mimetype.split('/')

        const isTypeValid = types.includes(filename)

        if (!isTypeValid) {
            return cb(null, false)
        }

        return cb(null, true)
    }
})

app.register(fastifyJwt, {
    secret: env.SECRET_JWT,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '2m'
    }
})

app.register(fastifyCookie)

app.register(cors)

app.register(fastifySwagger, swaggerOptions)
app.register(fastifySwaggerUi, swaggerUiOptions)

app.register(appRoutes)

app.setErrorHandler((error, _req, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: 'Validation Error.', issues: error.format() })
    } else if (error instanceof AppError) {
        return reply.status(error.errorCode).send({ message: error.message })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // ...
    }
})

export default app