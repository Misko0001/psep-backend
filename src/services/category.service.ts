import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Category } from "../entities/Category";

const repo = AppDataSource.getRepository(Category);

export class CategoryService {
    static async getAllCategorys() {
        const data = await repo.find({
            where: {
                categoryDeletedAt: IsNull()
            }
        });

        data.forEach(category => {
            delete category.categoryDeletedAt;
        });

        return data;
    }
}