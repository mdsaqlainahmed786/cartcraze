import { PrismaClient } from "@prisma/client";
import express, { Request, Response, json } from "express";
import z from "zod"
export const productsRouter = express.Router()
const prisma = new PrismaClient()
productsRouter.use(express.json())
const searchSchema = z.object({
    productQuery: z.string().min(1)
});
productsRouter.post("/add", async (req: Request, res: Response) => {
    const { title, description, newPrice, oldPrice, color, images, category, sizes } = req.body
    try {
        const product = await prisma.product.create({
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
        })
        //  console.log(product)
        res.status(200).json({
            message: "The product has sucessfully created!",
            product
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: "error occured"
        })
    }

})

productsRouter.get("/all", async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        res.status(200).json({
            products
        })
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
})

productsRouter.get("/get/:name", async (req: Request, res: Response) => {
    const productName = req.params.name.replace(/-/g, ' ');
    try {
        const specificProduct = await prisma.product.findFirst({
            where: {
                title: productName
            }
        })
        //console.log(specificProduct)
        res.status(200).json({
            specificProduct
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            error: "there was a error",
            err
        })
    }
})

// productsRouter.get('/category/:category', async (req: Request, res: Response) => {
//     const productCategory = req.params?.category
//     try {
//         const categorySpecificProducts = await prisma.product.findMany({
//             where: {
//                 category: productCategory
//             }
//         })
//         res.json({
//             message: `The products for the category ${productCategory}`,
//             categorySpecificProducts
//         })
//     } catch (err) {
//         res.status(400).json({
//             error: "No product found with that category!",
//             err
//         })
//     }
// })

productsRouter.get("/search", async (req: Request, res: Response) => {
    const productQuery = req.query?.productQuery as string;
    //console.log(productQuery)
    const parseResult = searchSchema.safeParse({ productQuery });
    if (!parseResult.success) {
        return res.status(400).json({ error: "Invalid search query" });
    }

    try {
        const foundProduct = await prisma.product.findMany({
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
        if (!foundProduct.length) return res.json({
            message: "There is not product with entered input!"
        })
        res.status(200).json({
            message: "Product found!",
            foundProduct
        });
    } catch (err) {
        res.status(400).json({
            error: "No product found with that query!",
            err
        });
    }
});

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