import { cleanEnv, str, port } from "envalid";

export const validateEnv = ():void => {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production']
        }),
        DB_NAME: str(),
        DB_USER: str(),
        DB_PASSWORD: str(),
        DB_HOST: str(),
        DB_PORT: port({ default: 3306 }),
        SERVER_PORT: port({ default: 5000 })
    })
}