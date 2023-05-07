import dotenv from "dotenv";
dotenv.config();

export const listOfServices = [
    {
        "name": "users",
        "url": process.env.USERS_SERVICE
    },
    {
        "name": "products",
        "url": process.env.PRODUCTS_SERVICE
    },
    {
        "name": "orders",
        "url": "http://localhost:3004"
    }
];