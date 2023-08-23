import { Prisma, Staff } from "@prisma/client";
import { StaffRepository } from "../staff-repository";
import prisma from "../../lib/prisma";

export class PrismaStaffRepository implements StaffRepository {
    async createStaff(data: Prisma.StaffCreateInput): Promise<Staff> {
        const staff = await prisma.staff.create({
            data
        })

        return staff
    }

    async getStaffByEmail(email: string): Promise<Staff | null> {
        const staff = await prisma.staff.findUnique({
            where: {
                email
            }
        })

        return staff
    }

    async getStaffByUsername(username: string): Promise<Staff | null> {
        const staff = await prisma.staff.findUnique({
            where: {
                username
            }
        })

        return staff
    }

    async getStaffByCpf(cpf: string): Promise<Staff | null> {
        const staff = await prisma.staff.findUnique({
            where: {
                cpf
            }
        })

        return staff
    }

    async getStaffById(id: string): Promise<Staff | null> {
        const staff = await prisma.staff.findUnique({
            where: {
                id
            }
        })

        return staff
    }

    async editStaff(id: string, email: string, username: string): Promise<Staff> {
        const staff = await prisma.staff.update({
            where: {
                id
            },
            data: {
                email,
                username
            }
        })

        return staff
    }

    async deleteStaff(id: string): Promise<Staff> {
        const staff = await prisma.staff.update({
            where: {
                id
            },
            data: {
                status: 0
            }
        })

        return staff
    }

    async getAllStafs(): Promise<Staff[] | null> {
        const staff = await prisma.staff.findMany({
            where: {
                status: 1
            }
        })

        return staff
    }
}