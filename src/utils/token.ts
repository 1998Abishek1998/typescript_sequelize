import { Secret, sign, verify, VerifyErrors } from "jsonwebtoken";
import User from "../resources/user/user.model";
import Token from "./interface/token.interface";

export const createToken = (user: User): string => {
    return sign(
        {
            id: user.id
        },
        process.env.JWT_SECRET_KEY as Secret,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    )
}

export const verifyToken = async(
    token: string
): Promise<VerifyErrors | Token> => {
    return new Promise((resolve, reject) => {
        verify(token, process.env.JWT_SECRET_KEY as Secret, (err, payload) => {
            if(err) return reject(err)
            else resolve(payload as Token)
        })
    })
}