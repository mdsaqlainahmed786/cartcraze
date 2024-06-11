"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
exports.productsRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
exports.productsRouter.use(express_1.default.json());
exports.productsRouter.post("/addprod", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price, image, category } = req.body;
    try {
        const product = yield prisma.product.create({
            data: {
                title,
                description,
                price,
                image,
                category
            }
        });
        console.log(product);
        res.status(200).json({
            message: "The product has sucessfully created!",
            product
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            message: "error occured"
        });
    }
}));
exports.productsRouter.get("/getallprod", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma.product.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.status(200).json({
            products
        });
    }
    catch (err) {
        res.status(400).json({
            error: err
        });
    }
}));
exports.productsRouter.get("/getproduct/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const specificProduct = yield prisma.product.findFirst({
            where: {
                id: productId
            }
        });
        console.log(specificProduct);
        res.status(200).json({
            specificProduct
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            error: "there was a error",
            err
        });
    }
}));
