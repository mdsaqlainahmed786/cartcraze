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
const orders_1 = require("./orders");
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["https://cartcraze.anxiousdev.online", "http://localhost:5173"],
    credentials: true
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//app.use('/api', limiter)
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/v1/user", users_1.userRouter);
app.use("/api/v1/products", products_1.productsRouter);
app.use("/api/v1/cart", authMiddleware_1.default, cart_1.cartRouter);
app.use("/api/v1/orders", orders_1.orderRouter);
//app.use("/api/v1/wishlist", wishListRouter)
app.listen(5001, () => {
    console.log("The server is listening on port 3000");
});
