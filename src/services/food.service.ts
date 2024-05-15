import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Food } from "../entities/Food";

const repo = AppDataSource.getRepository(Food);

export class FoodService {
    static async getAllFoods() {
        const data = await repo.find({
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

        data.forEach(food => {
            delete food.foodCategory.categoryDeletedAt;
            delete food.foodRestaurant.restaurantDeletedAt;
            delete food.foodDeletedAt;
        });

        return data;
    }
}