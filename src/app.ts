import fastify from "fastify";
import cors from "@fastify/cors"
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";
import { AppError } from "./errors/AppError";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

const app = fastify()


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
        //
    }
})

export default app