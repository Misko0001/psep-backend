import { configDotenv } from "dotenv";
import { DataSource } from "typeorm";
import { Category } from "./entities/Category";
import { Customer } from "./entities/Customer";
import { Food } from "./entities/Food";
import { FoodOrder } from "./entities/FoodOrder";
import { Order } from "./entities/Order";
import { Restaurant } from "./entities/Restaurant";
import { State } from "./entities/State";
import { User } from "./entities/User";

configDotenv();
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number.parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Category, Customer, Food, FoodOrder, Order, Restaurant, State, User],
    logging: false
});