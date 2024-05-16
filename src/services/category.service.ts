import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Category } from "../entities/Category";
import { NameModel } from "../models/name.model";

const repo = AppDataSource.getRepository(Category);

export class CategoryService {

    static async getAllCategorys() {
        return await repo.find({
            select: {
                categoryId: true,
                categoryName: true,
                categoryCreatedAt: true,
                categoryUpdatedAt: true
            },
            where: {
                categoryDeletedAt: IsNull()
            }
        });
    }

    static async getCategoryById(id: number) {
        const data = await repo.findOne({
            select: {
                categoryId: true,
                categoryName: true,
                categoryCreatedAt: true,
                categoryUpdatedAt: true
            },
            where: {
                categoryId: id,
                categoryDeletedAt: IsNull()
            }
        });

        if (data == undefined) {
            throw new Error("NOT_FOUND");
        }

        return data;
    }

    static async createCategory(model: NameModel) {
        const data = await repo.save({
            categoryName: model.categoryName,
            categoryCreatedAt: new Date()
        });
        delete data.categoryDeletedAt;
        return data;
    }

    static async updateCategory(id: number, model: NameModel) {
        const data = await this.getCategoryById(id);
        data.categoryName = model.categoryName;
        data.categoryUpdatedAt = new Date();
        const newData = await repo.save(data);
        delete newData.categoryDeletedAt;
        return newData;
    }

    static async deleteCategory(id: number) {
        const data = await this.getCategoryById(id);
        data.categoryDeletedAt = new Date();
        await repo.save(data);
    }

}