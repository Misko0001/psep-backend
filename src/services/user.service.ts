import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { User } from "../entities/User";

const repo = AppDataSource.getRepository(User);

export class UserService {
    static async getAllUsers() {
        const data = await repo.find({
            where: {
                userActive: 1
            }
        });

        data.forEach(user => {
            delete user.userActive;
        });

        return data;
    }
}