import 'dotenv/config'
import App from './app'
import PostRouter from './resources/post/post.router'
import UserRouter from './resources/user/user.router'
import { validateEnv } from './utils/validateEnv'

validateEnv()

const app = new App(
    [
        new PostRouter(),
        new UserRouter()
    ],
    Number(process.env.SERVER_PORT)
)

app.listen()