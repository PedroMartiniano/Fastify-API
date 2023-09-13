export const swaggerOptions = {
    swagger: {
        info: {
            title: "LearnHub",
            description: "Olá esse é meu swagger.",
            version: "1.0.0",
        },
        host: "localhost",
        schemes: ["http", "https"],
        consumes: ["application/json"],
        produces: ["application/json"],
    },
};

export const swaggerUiOptions = {
    routePrefix: "/swagger",
    exposeRoute: true,
};