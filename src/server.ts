import { PrismaClient } from "@prisma/client";
import app from "./app";

const prisma = new PrismaClient()

app.post('/', async (request, reply) => {
    const {email, username, password} = request.body

    await prisma.user.create({
        data: {
            email,
            password,
            username
        }
    })

    return reply.status(201).send()
})

app.listen({
    host: '0.0.0.0',
    port: 3333
}).then(() => console.log('Server Up and Running 🏎'))