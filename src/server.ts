import express from "express"
import cors from 'cors'
import { env } from "./env.js"

const app = express()

app.use(express.json())
app.use(cors())


app.listen(env.PORT, () => {
    console.log('HTTP server running');
})