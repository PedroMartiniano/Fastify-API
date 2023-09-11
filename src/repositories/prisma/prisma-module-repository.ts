import { Module, Prisma } from "@prisma/client";
import { ModuleRepository } from "../module-repository";
import prisma from "../../lib/prisma";
import { AppError } from "../../errors/AppError";
import { ModuleGet } from "../../@types/module-get";

export class PrismaModuleRepository implements ModuleRepository {
    async createModule(data: Prisma.ModuleUncheckedCreateInput): Promise<Module> {
        const moduleCreate = await prisma.module.create({
            data
        })

        return moduleCreate
    }

    async getModuleById(id: string): Promise<Module | null> {
        const moduleGet = await prisma.module.findUnique({
            where: {
                id
            }
        })

        if (!moduleGet) return null

        return moduleGet
    }

    async editModule(id: string, name: string, description: string): Promise<Module> {
        const moduleEdited = await prisma.module.update({
            where: {
                id
            },
            data: {
                name,
                description
            }
        })

        return moduleEdited
    }

    async deleteModuleByCourse(id_course: string) {
        const deleteModule = await prisma.module.updateMany({
            where: {
                id_course
            },
            data: {
                status: 0
            }
        })

        if (deleteModule) {
            return true
        }

        return false
    }

    async getModuleByCourse(id_course: string): Promise<Module[] | null> {
        const modules = await prisma.module.findMany({
            where: {
                id_course
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return modules
    }

    async getAllModulesModified(): Promise<ModuleGet[] | null> {
        try {
            const modules = await prisma.module.findMany({
                select: {
                    name: true,
                    description: true,
                    course: {
                        select: {
                            name: true
                        }
                    },
                    staff: {
                        select: {
                            username: true
                        }
                    }
                }
            })


            const modulesRenamed = modules.map(mod => {
                return { name: mod.name, description: mod.description, courseName: mod.course.name, staffName: mod.staff.username }
            })

            return modulesRenamed
        } catch {
            return null
        }
    }
}