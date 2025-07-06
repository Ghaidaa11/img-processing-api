import express from "express"
import Resize from "./routes/resize"

const port = 3000
const app = express()

app.use('/api/images', Resize())

app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
});