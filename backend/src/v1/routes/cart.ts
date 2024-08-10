import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
export const cartRouter = express.Router()
const stripe = require('stripe')("sk_test_51PdkvCAvBpizqBWZNPKsJ9odNwuml1kTx5qQ7nbuZ13DtIxvWSn4kIlA9XiotRSLZ6SksEHQezN2kkzVQqtP2Qcm00bQ4UON3F")
const prisma = new PrismaClient()
cartRouter.use(express.json())
interface AuthenticatedRequest extends Request {
    user?: {
        userId: string,
        email: string
    }
}

//("sk_test_51PdkvCAvBpizqBWZNPKsJ9odNwuml1kTx5qQ7nbuZ13DtIxvWSn4kIlA9XiotRSLZ6SksEHQezN2kkzVQqtP2Qcm00bQ4UON3F")
// const pincodeData: Record<string, [string, string]> = JSON.parse(
//     fs.readFileSync(path.join(__dirname, '..', '..', 'src', 'v1', 'routes', 'pincodeData.json'), 'utf8')
// );
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
    console.log(userId, "This is the user id")
    if (!userId) return res.status(401).json({ message: "unauthorized!" })
    try {
        const { productId, quantity, size } = req.body
        console.log(req.body, "THIS IS SHIT GODDY")
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
            res.status(400).json({
                message: "The product already exists in the cart!",
            })
            //   console.log(updatedProduct)
        }
        else {
            const item = await prisma.cart.create({
                data: {
                    userId,
                    productId,
                    quantity,
                    size,

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
        const { productId, quantity, size } = req.body
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
                quantity,
                size
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
        if (!cartId) return res.json({ msg: "The cart doesn't exist!!!" })
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

cartRouter.delete("/deleteall", async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId
    try {
        await prisma.cart.deleteMany({
            where: {
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
cartRouter.post("/create-checkout-session", async (req: AuthenticatedRequest, res: Response) => {
    const products = req.body.products;

    try {
        const lineItems = products.map((item: any) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.product.title,
                },
                unit_amount: item.product.newPrice * 100,
            },
            quantity: item.quantity,
        }));

        const taxPercentage = 0.05;
        //@ts-ignore
        const totalAmount = lineItems.reduce((total: number, item) => {
            return total + item.price_data.unit_amount * item.quantity;
        }, 0);
        const taxAmount = totalAmount * taxPercentage;

        lineItems.push({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: 'Tax',
                },
                unit_amount: Math.round(taxAmount),
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error("Stripe session error:", error);
        res.status(500).send("Error creating session");
    }
});
// cartRouter.get("/pincode", async (req, res) => {
//     const pincode = req.query.pincode as string;

//     if (!pincode) {
//       return res.status(400).json({ error: "Pincode is required" });
//     }
//     const location = pincodeData[pincode];

//     if (!location) {
//       return res.status(404).json({ error: "Pincode not found" });
//     }

//     const [city, state] = location;
//     return res.json({ city, state });
// });
// cartRouter.post('/apply-coupon', async (req: AuthenticatedRequest, res) => {
//     const userId = req.user?.userId;
//     const { code } = req.body;

//     try {
//         // Find the user
//         const user = await prisma.user.findUnique({
//             where: { id: userId },
//         });

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Check if the user has already used the coupon
//         if (user.isCouponUsed) {
//             return res.status(400).json({ error: 'Coupon already used' });
//         }

//         // Find the coupon
//         const coupon = await prisma.coupon.findUnique({
//             where: { code },
//         });

//         if (!coupon || !coupon.isActive) {
//             return res.status(400).json({ error: 'Invalid coupon code' });
//         }

//         // Mark the coupon as used by the user
//         await prisma.user.update({
//             where: { id: userId },
//             data: { isCouponUsed: true },
//         });

//         const cartItems = await prisma.cart.findMany({
//             orderBy: { createdAt: 'desc' },
//             where: { userId },
//             include: { product: true }
//         });
//         let totalAmount = cartItems.reduce((total, item) => {
//             return total + item.product.newPrice * item.quantity;
//         }, 0);
//         const taxAmount = totalAmount * 0.05;
//         const discountAmount = totalAmount * coupon.discount;
//         const finalTotalAmount = totalAmount + taxAmount - discountAmount;

//         res.status(200).json({
//             success: true,
//             discountAmount: coupon.discount,
//             cartItems,
//             totalAmount: finalTotalAmount,
//             taxAmount
//         });
//     } catch (error) {
//         console.error('Failed to apply coupon:', error);
//         res.status(500).json({ error: 'Failed to apply coupon' });
//     }
// });

// cartRouter.post('/create-coupon', async (req, res) => {
//     const { code, discount } = req.body;

//     try {
//         const coupon = await prisma.coupon.create({
//             data: {
//                 code,
//                 discount,
//                 isActive: true,
//             },
//         });

//         res.json({ success: true, coupon });
//     } catch (error) {
//         console.error('Error creating coupon:', error);
//         res.status(500).json({ error: 'Failed to create coupon' });
//     }
// });

// cartRouter.put('/update-price', async (req: AuthenticatedRequest, res: Response) => {
//     const userId = req.user?.userId;
//     const { totalAmount } = req.body;
//     const user = await prisma.user.findUnique({
//         where:
//             { id: userId },
//     })
//     if (user?.isCouponUsed) {
//         try {
//             const updatedPrice = await prisma.cart.update({
//                 where: {
//                     id: userId
//                 },
//                 data: {
//                     totalAmount: totalAmount
//                 } as any
//             })
//             res.json({ success: true, updatedPrice })
//             console.log(updatedPrice)
//         } catch (error) {
//             console.error('Error updating price:', error);
//             res.status(500).json({ error: 'Failed to update price' });
//         }
//     }
//     else {
//         res.json({ message: "The user has not applied the coupon!" })
//     }
// });

