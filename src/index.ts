import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { configDotenv } from 'dotenv';
import { AppDataSource } from './db';
import { CategoryRoute } from './routes/category.route';
import { CustomerRoute } from './routes/customer.route';
import { FoodOrderRoute } from './routes/food-order.route';
import { FoodRoute } from './routes/food.route';
import { OrderRoute } from './routes/order.route';
import { RestaurantRoute } from './routes/restaurant.route';
import { StateRoute } from './routes/state.route';
import { UserRoute } from './routes/user.route';
import { authenticateToken } from './utils';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

configDotenv();
AppDataSource.initialize().then(() => {
    console.log("Connected to database")
    const port = process.env.SERVER_PORT || 4000;
    app.listen(port, () => {
        console.log("Listening on port " + port);
    });
}).catch((e) => console.log(e));

app.use(authenticateToken);
app.use('/api/user', UserRoute);
app.use('/api/category', CategoryRoute);
app.use('/api/customer', CustomerRoute);
app.use('/api/food-order', FoodOrderRoute);
app.use('/api/food', FoodRoute);
app.use('/api/order', OrderRoute);
app.use('/api/restaurant', RestaurantRoute);
app.use('/api/state', StateRoute);

app.get("*", (req, res) => {
    res.status(404).json({
        message: "NOT_FOUND",
        timestamp: new Date()
    });
});

app.post("*", (req, res) => {
    res.status(501).json({
        message: "NOT_IMPLEMENTED",
        timestamp: new Date()
    });
});

app.put("*", (req, res) => {
    res.status(501).json({
        message: "NOT_IMPLEMENTED",
        timestamp: new Date()
    });
});

app.delete("*", (req, res) => {
    res.status(501).json({
        message: "NOT_IMPLEMENTED",
        timestamp: new Date()
    });
});