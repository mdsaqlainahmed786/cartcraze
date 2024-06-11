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
const zod_1 = __importDefault(require("zod"));
exports.productsRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
exports.productsRouter.use(express_1.default.json());
const searchSchema = zod_1.default.object({
    productQuery: zod_1.default.string().min(1)
});
exports.productsRouter.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price, images, category } = req.body;
    try {
        const product = yield prisma.product.create({
            data: {
                title,
                description,
                price,
                images,
                category
            }
        });
        //  console.log(product)
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
exports.productsRouter.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.productsRouter.get("/get/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const specificProduct = yield prisma.product.findFirst({
            where: {
                id: productId
            }
        });
        //console.log(specificProduct)
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
exports.productsRouter.get('/category/:category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const productCategory = (_a = req.params) === null || _a === void 0 ? void 0 : _a.category;
    try {
        const categorySpecificProducts = yield prisma.product.findMany({
            where: {
                category: productCategory
            }
        });
        res.json({
            message: `The products for the category ${productCategory}`,
            categorySpecificProducts
        });
    }
    catch (err) {
        res.status(400).json({
            error: "No product found with that category!",
            err
        });
    }
}));
exports.productsRouter.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const productQuery = (_b = req.query) === null || _b === void 0 ? void 0 : _b.productQuery;
    //console.log(productQuery)
    const parseResult = searchSchema.safeParse({ productQuery });
    if (!parseResult.success) {
        return res.status(400).json({ error: "Invalid search query" });
    }
    try {
        const foundProduct = yield prisma.product.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: productQuery,
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains: productQuery,
                            mode: 'insensitive'
                        }
                    }
                ]
            }
        });
        //  console.log(foundProduct)
        if (!foundProduct.length)
            return res.json({
                message: "There is not product with entered input!"
            });
        res.status(200).json({
            message: "Product found!",
            foundProduct
        });
    }
    catch (err) {
        res.status(400).json({
            error: "No product found with that query!",
            err
        });
    }
}));
exports.productsRouter.get('/filter_price', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const minPrice = parseInt((_c = req.query) === null || _c === void 0 ? void 0 : _c.min);
    const maxPrice = parseInt((_d = req.query) === null || _d === void 0 ? void 0 : _d.max);
    if (minPrice > maxPrice)
        return res.status(400).json({ message: "Invalid filtering" });
    try {
        const filteredProducts = yield prisma.product.findMany({
            where: {
                price: {
                    'gte': minPrice || 0,
                    'lte': maxPrice || Number.MAX_SAFE_INTEGER
                }
            }
        });
        if (!filteredProducts.length)
            return res.json({
                message: "There is not product with entered input!"
            });
        res.status(200).json({
            message: "Products filtered!",
            filteredProducts
        });
    }
    catch (err) {
        res.status(400).json({
            error: "No product found with that query!",
            err
        });
    }
}));
