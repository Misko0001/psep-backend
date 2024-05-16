import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Food } from "../entities/Food";
import { checkIfDefined } from "../utils";
import { FoodModel } from "../models/food.model";

const repo = AppDataSource.getRepository(Food);

export class FoodService {

    static async getAllFoods() {
        return await repo.find({
            select: {
                foodId: true,
                foodName: true,
                foodCreatedAt: true,
                foodUpdatedAt: true,
                foodCategory: {
                    categoryId: true,
                    categoryName: true,
                },
                foodRestaurant: {
                    restaurantId: true,
                    restaurantName: true
                }
            },
            where: {
                foodCategory: {
                    categoryDeletedAt: IsNull()
                },
                foodRestaurant: {
                    restaurantDeletedAt: IsNull()
                },
                foodDeletedAt: IsNull()
            },
            relations: {
                foodCategory: true,
                foodRestaurant: true
            }
        });
    }

    static async getFoodById(id: number) {
        const data = await repo.findOne({
            select: {
                foodId: true,
                foodName: true,
                foodCreatedAt: true,
                foodUpdatedAt: true,
                foodCategory: {
                    categoryId: true,
                    categoryName: true,
                },
                foodRestaurant: {
                    restaurantId: true,
                    restaurantName: true
                }
            },
            where: {
                foodCategory: {
                    categoryDeletedAt: IsNull()
                },
                foodRestaurant: {
                    restaurantDeletedAt: IsNull()
                },
                foodId: id,
                foodDeletedAt: IsNull()
            },
            relations: {
                foodCategory: true,
                foodRestaurant: true
            }
        });
        return checkIfDefined(data);
    }

    static async getFoodWithoutRelationsById(id: number) {
        const data = await repo.findOne({
            select: {
                foodId: true,
                foodName: true,
                foodCategoryId: true,
                foodRestaurantId: true,
                foodCreatedAt: true,
                foodUpdatedAt: true,
            },
            where: {
                foodCategory: {
                    categoryDeletedAt: IsNull()
                },
                foodRestaurant: {
                    restaurantDeletedAt: IsNull()
                },
                foodId: id,
                foodDeletedAt: IsNull()
            }
        });
        return checkIfDefined(data);
    }

    static async createFood(model: FoodModel) {
        const data = await repo.save({
            foodName: model.foodName,
            foodCreatedAt: new Date(),
            foodCategoryId: model.foodCategoryId,
            foodRestaurantId: model.foodRestaurantId
        });
        delete data.foodDeletedAt;
        return data;
    }

    static async updateFood(id: number, model: FoodModel) {
        const data = await this.getFoodWithoutRelationsById(id);
        data.foodName = model.foodName;
        data.foodUpdatedAt = new Date();
        data.foodCategoryId = model.foodCategoryId;
        data.foodRestaurantId = model.foodRestaurantId;
        const newData = await repo.save(data);
        delete newData.foodDeletedAt;
        return newData;
    }

    static async deleteFood(id: number) {
        const data = await this.getFoodWithoutRelationsById(id);
        data.foodDeletedAt = new Date()
        await repo.save(data);
    }

}