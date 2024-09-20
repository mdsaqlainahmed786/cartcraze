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
//import { wishListRouter } from "./wishlist"

const app = express()
// const limiter = rateLimit({
//     max:100,
//     windowMs: 60 * 10 * 1000,
//     message:"Too many requests, Please try again shortly!"
// })
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin:"https://cartcraze.vercel.app"
}));
app.use(helmet())   
//app.use('/api', limiter)
app.use(express.json())
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