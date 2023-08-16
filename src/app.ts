import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";
import { AppError } from "./errors/AppError";

const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _req, reply) => {
    if(error instanceof ZodError){
        return reply.status(400).send({message: 'Validation Error.', issues: error.format()})
    } else if (error instanceof AppError) {
        return reply.status(error.errorCode).send({message: error.message})
    }

    if(env.NODE_ENV !== 'production'){
        console.error(error)
    } else {
        //
    }
})

export default app