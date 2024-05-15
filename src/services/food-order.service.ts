import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { FoodOrder } from "../entities/FoodOrder";

const repo = AppDataSource.getRepository(FoodOrder);

export class FoodOrderService {
    static async getAllFoodOrders() {
        const data = await repo.find({
            where: {
                foodOrderFood: {
                    foodDeletedAt: IsNull()
                },
                foodOrderOrder: {
                    orderDeletedAt: IsNull()
                },
                foodOrderDeletedAt: IsNull()
            },
            relations: {
                foodOrderFood: true,
                foodOrderOrder: true
            }
        });

        data.forEach(foodOrder => {
            delete foodOrder.foodOrderFood.foodDeletedAt;
            delete foodOrder.foodOrderOrder.orderDeletedAt;
            delete foodOrder.foodOrderDeletedAt;
        });

        return data;
    }
}