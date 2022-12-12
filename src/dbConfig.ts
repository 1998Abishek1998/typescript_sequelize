import { Sequelize } from "sequelize-typescript";
import Post from "./resources/post/post.model";
import User from "./resources/user/user.model";

const connection = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    models: [
        Post,
        User,
    ]
})

export default connection