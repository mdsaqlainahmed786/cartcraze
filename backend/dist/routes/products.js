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
    const { title, description, newPrice, oldPrice, color, images, category, sizes } = req.body;
    try {
        const product = yield prisma.product.create({
            data: {
                title,
                description,
                newPrice,
                oldPrice,
                color,
                sizes,
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
exports.productsRouter.get("/get/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productName = req.params.name.replace(/-/g, ' ');
    try {
        const specificProduct = yield prisma.product.findFirst({
            where: {
                title: productName
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
    const productCategory = req.params.category;
    let { color, size } = req.query;
    const colors = typeof color === 'string' ? color.split(',') : [];
    const sizes = typeof size === 'string' ? size.split(',') : [];
    const whereClause = {
        category: productCategory
    };
    if (colors.length) {
        whereClause.color = {
            in: colors
        };
    }
    if (sizes.length) {
        whereClause.sizes = {
            hasSome: sizes
        };
    }
    try {
        const categorySpecificProducts = yield prisma.product.findMany({
            where: whereClause
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
    const { productQuery } = req.query;
    const searchWords = productQuery.split(' ');
    const whereClause = searchWords.map(word => ({
        title: {
            contains: word,
            mode: 'insensitive'
        }
    }));
    try {
        const products = yield prisma.product.findMany({
            where: {
                AND: whereClause
            }
        });
        if (products.length === 0) {
            return res.status(404).json({
                message: "No products found matching your query"
            });
        }
        res.status(200).json({
            message: "Products found",
            products
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            error: "An error occurred while searching for products",
            err
        });
    }
}));
// productsRouter.get('/filter_price', async (req: Request, res: Response) => {
//     const minPrice = parseInt(req.query?.min as string)
//     const maxPrice = parseInt(req.query?.max as string)
//     if(minPrice>maxPrice) return res.status(400).json({message:"Invalid filtering"})
//     try {
//         const filteredProducts = await prisma.product.findMany({
//             where: {
//                 price: {
//                     'gte': minPrice || 0,
//                     'lte': maxPrice || Number.MAX_SAFE_INTEGER
//                 }
//             }
//         })
//         if (!filteredProducts.length) return res.json({
//             message: "There is not product with entered input!"
//         })
//         res.status(200).json({
//             message:"Products filtered!",
//             filteredProducts
//         })
//     } catch (err) {
//         res.status(400).json({
//             error: "No product found with that query!",
//             err
//         });
//     }
// })
