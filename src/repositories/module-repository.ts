import { Module, Prisma } from "@prisma/client";

export interface ModuleRepository {
    createModule(data: Prisma.ModuleUncheckedCreateInput): Promise<Module>
    getModuleById(id: string): Promise<Module | null>
    editModule(id: string, name: string, description: string): Promise<Module>
    deleteModuleByCourse(id_course: string): Promise<boolean>
    getModuleByCourse(id_course: string): Promise<Module[] | null>
}