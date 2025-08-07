import express from "express"
import cors from 'cors'
import { env } from "./env.ts"
import routes from "./routes/index.ts"

const app = express()

app.use(cors({
    origin: '*'
}))

app.use(express.json())

app.use(routes)


app.listen(env.PORT, '0.0.0.0', () => {
    console.log('HTTP server running');
})