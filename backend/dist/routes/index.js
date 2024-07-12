"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const users_1 = require("./users");
const products_1 = require("./products");
const cart_1 = require("./cart");
const authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
//import { wishListRouter } from "./wishlist"
const app = (0, express_1.default)();
// const limiter = rateLimit({
//     max:100,
//     windowMs: 60 * 10 * 1000,
//     message:"Too many requests, Please try again shortly!"
// })
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173"
}));
//app.use('/api', limiter)
app.use(express_1.default.json());
app.use("/api/v1/user", users_1.userRouter);
app.use("/api/v1/products", products_1.productsRouter);
app.use("/api/v1/cart", authMiddleware_1.default, cart_1.cartRouter);
//app.use("/api/v1/wishlist", wishListRouter)
app.listen(3000, () => {
    console.log("The server is listening on port 3000");
});
