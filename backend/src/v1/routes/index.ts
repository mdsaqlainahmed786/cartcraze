import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { userRouter } from "./users"
import { productsRouter } from "./products"
import { cartRouter } from "./cart"
import authMiddleware from "./middlewares/authMiddleware"
import rateLimit from "express-rate-limit"
import { orderRouter } from "./orders"
import helmet from "helmet"


const app = express()

app.use(cors({
    origin:"https://cartcraze.anxiousdev.online",
    credentials: true
}));


app.use(helmet())   
app.use(express.json())
app.use(cookieParser());

//app.use('/api', limiter)
app.get("/", (req, res)=>{
    res.send("Hello World")
})
app.use("/api/v1/user", userRouter)
app.use("/api/v1/products", productsRouter)
app.use("/api/v1/cart",authMiddleware, cartRouter)
app.use("/api/v1/orders", orderRouter)
//app.use("/api/v1/wishlist", wishListRouter)


app.listen(process.env.PORT, () => {
    console.log("The server is listening on port 3000")
})