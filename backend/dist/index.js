"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_1 = require("./users");
const products_1 = require("./products");
const cart_1 = require("./cart");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use(express_1.default.json());
app.use("/api/v1/user", users_1.userRouter);
app.use("/api/v1/products", products_1.productsRouter);
app.use("/api/v1/cart", cart_1.cartRouter);
app.listen(3000, () => {
    console.log("The server is listening on port 3000");
});
