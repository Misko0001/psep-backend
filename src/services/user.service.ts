import { configDotenv } from "dotenv";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { LoginModel } from "../models/login.model";
import { checkIfDefined } from "../utils";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const repo = AppDataSource.getRepository(User);

configDotenv();
const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const accessExpire = process.env.ACCESS_TOKEN_TTL;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshExpire = process.env.REFRESH_TOKEN_TTL;

export class UserService {

    static async login(model: LoginModel) {
        const user: User = await this.getUserByUsername(model.username);
        if (await bcrypt.compare(model.password, user.userPassword)) {
            return {
                username: user.userName,
                access: jwt.sign({ name: user.userName }, accessSecret, { expiresIn: accessExpire }),
                refresh: jwt.sign({ name: user.userName }, refreshSecret, { expiresIn: refreshExpire })
            }       
        }
        throw new Error("BAD_CREDENTIALS");
    }

    public static async refreshToken(refresh: string) {
        try {
            const decoded: any = jwt.verify(refresh, refreshSecret as string);
            return {
                username: decoded.name,
                access: jwt.sign({ name: decoded.name }, accessSecret, { expiresIn: accessExpire }),
                refresh: refresh
            }
        } catch (err) {
            throw new Error('REFRESH_FAILED');
        }
    }

    static async getUserByUsername(username: string) {
        const data = await repo.findOne({
            where: {
                userActive: true,
                userName: username
            }
        });
        return checkIfDefined(data);
    }

}