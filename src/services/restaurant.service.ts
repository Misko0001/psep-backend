import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Restaurant } from "../entities/Restaurant";
import { NameModel } from "../models/name.model";
import { checkIfDefined } from "../utils";

const repo = AppDataSource.getRepository(Restaurant);

export class RestaurantService {

    static async getAllRestaurants() {
        return await repo.find({
            select: {
                restaurantId: true,
                restaurantName: true,
                restaurantCreatedAt: true,
                restaurantUpdatedAt: true
            },
            where: {
                restaurantDeletedAt: IsNull()
            }
        });
    }

    static async getRestaurantById(id: number) {
        const data = await repo.findOne({
            select: {
                restaurantId: true,
                restaurantName: true,
                restaurantCreatedAt: true,
                restaurantUpdatedAt: true
            },
            where: {
                restaurantId: id,
                restaurantDeletedAt: IsNull()
            }
        });
        return checkIfDefined(data);
    }

    static async createRestaurant(model: NameModel) {
        const data = await repo.save({
            restaurantName: model.restaurantName,
            restaurantCreatedAt: new Date()
        });
        delete data.restaurantDeletedAt;
        return data;
    }

    static async updateRestaurant(id: number, model: NameModel) {
        const data = await this.getRestaurantById(id);
        data.restaurantName = model.restaurantName;
        data.restaurantUpdatedAt = new Date();
        const newData = await repo.save(data);
        delete newData.restaurantDeletedAt;
        return newData;
    }

    static async deleteRestaurant(id: number) {
        const data = await this.getRestaurantById(id);
        data.restaurantDeletedAt = new Date();
        await repo.save(data);
    }

}