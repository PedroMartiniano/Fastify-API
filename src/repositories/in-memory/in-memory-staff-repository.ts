// import { Prisma, Staff } from "@prisma/client";
// import { StaffRepository } from "../staff-repository";

// export class InMemoryStaffRepository implements StaffRepository {
//     private items: Staff[] = []
//     private staffItems: Staff[] = [
//         { id: '123', cpf: '12345678910', email: 'staff@gmail.com', username: 'staff1', password: '123456', status: 1 },
//         { id: '321', cpf: '12345678911', email: 'staff2@gmail.com', username: 'staff2', password: '123456', status: 1 }
//     ]

//     async createStaff(data: Prisma.StaffCreateInput): Promise<Staff> {
//         const staff = {
//             id: `${this.items.length}`,
//             cpf: data.cpf,
//             email: data.email,
//             username: data.username,
//             password: data.password,
//             status: 1
//         }

//         this.items.push(staff)

//         return staff
//     }

//     getStaffByUsername(username: string): Promise<Staff | null> {
//         const staff = this.items.find(staff => staff.username === username)

//         if(!staff){
//             return null
//         }

//         return staff
//     }
// }