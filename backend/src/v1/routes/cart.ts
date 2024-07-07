import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
export const cartRouter = express.Router()
const prisma = new PrismaClient()
cartRouter.use(express.json())
interface AuthenticatedRequest extends Request {
    user?: {
        userId: string,
        email: string
    }
}


cartRouter.get('/getcart', async (req: AuthenticatedRequest, res: Response) => {
    const authenticatedUser = req as AuthenticatedRequest
    if (!authenticatedUser) return res.status(400).json({ message: "The user is not authenticated!" })
    const userId = req.user?.userId
    try {
        const cartItems = await prisma.cart.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                userId
            },
            include: {
                product: true
            }
        })
        const totalAmount = cartItems.reduce((total, item) => {
            return total + item.product.newPrice * item.quantity;
        }, 0)
        res.status(200).json({
            cartItems,
            totalAmount
        })
    } catch (error) {
        res.json({
            error
        })
    }
})

cartRouter.post("/add", async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId
    if (!userId) return res.status(401).json({ message: "unauthorized!" })
    try {
        const { productId, quantity } = req.body
        const existingProduct = await prisma.cart.findFirst({
            where: {
                productId,
                userId
            },
            include: {
                product: true
            }
        })
        if (existingProduct) {
            //  console.log(existingProduct)
            const updatedProduct = await prisma.cart.update({
                where: {
                    id: existingProduct.id
                },
                data: {
                    quantity: existingProduct.quantity + 1
                },
                include: {
                    product: true
                }
            })

            res.status(200).json({
                message: "The product is been updated!",
                updatedProduct
            })
            //   console.log(updatedProduct)
        }
        else {
            const item = await prisma.cart.create({
                data: {
                    userId,
                    productId,
                    quantity
                },
                include: {
                    product: true
                }
            })
            res.status(200).json({
                message: "The product added to cart!",
                item
            })
        }
    } catch (error) {
        res.json({
            message: "There was a error",
            error
        })
    }
})

cartRouter.put("/update/:id", async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId
    const cartId = req.params?.id
    if (!userId) return res.status(401).json({
        message: "The user is not authenticated"
    })
    try {
        const { productId, quantity } = req.body
        const ifExistProductToUpdate = await prisma.cart.findFirst({
            where: {
                productId,
                userId
            },
            include: {
                product: true
            }
        })
        if (!ifExistProductToUpdate) return res.json({ message: "No cart item to update!" })
        const updatedQuantityItem = await prisma.cart.update({
            where: {
                id: cartId,
                userId
            },
            data: {
                productId,
                quantity
            }
        })
        //  console.log(updatedQuantityItem)
        res.status(200).json({
            message: "Cart quantity updated successfully!",
            updatedQuantityItem
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "There was a error",
            error
        })
    }
})

cartRouter.delete("/delete/:id", async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId
    const cartId = req.params?.id
    try {
        const existingCart = await prisma.cart.findUnique({
            where: {
                id: cartId,
                userId
            }
        });

        if (!existingCart) {
            return res.status(404).json({ message: "The cart doesn't exist!" });
        }
        await prisma.cart.delete({
            where: {
                id: cartId,
                userId
            }
        })
        if(!cartId) return res.json({msg:"The cart doesn't exist!!!"})
        res.status(200).json({
            message: "The cart has been deleted!"
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "There was a error",
            error
        })
    }
})

cartRouter.delete("/deleteall", async(req:AuthenticatedRequest, res:Response)=>{
      const userId = req.user?.userId
    try {
        await prisma.cart.deleteMany({
          where:{
            userId
          }
        })
        res.status(200).json({
            message: "The complete cart has been deleted"
        })

    } catch (error) {
        res.json({
            message: "There was a error",
            error
        })
    }
})