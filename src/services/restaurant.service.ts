import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Restaurant } from "../entities/Restaurant";

const repo = AppDataSource.getRepository(Restaurant);

export class RestaurantService {
    static async getAllRestaurants() {
        const data = await repo.find({
            where: {
                restaurantDeletedAt: IsNull()
            }
        });

        data.forEach(restaurant => {
            delete restaurant.restaurantDeletedAt;
        });

        return data;
    }
}