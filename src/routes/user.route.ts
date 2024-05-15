import { Router } from "express";
import { handleRequest } from "../utils";
import { UserService } from "../services/user.service";

export const UserRoute = Router();

UserRoute.get('/', (req, res) => {
    handleRequest(res, UserService.getAllUsers());
});