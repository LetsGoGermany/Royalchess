import prisma from "../config/prisma.js";
import { hashPassword } from "./hash.service.js";

export async function newUser(user) {
    const {username, password, email} = user
    const hashedPassword = await hashPassword(password)
    const userCreated = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        },
    })
    return userCreated
}

export async function getUser(email) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return user
}