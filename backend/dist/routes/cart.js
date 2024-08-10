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
exports.cartRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
exports.cartRouter = express_1.default.Router();
const stripe = require('stripe')("sk_test_51PdkvCAvBpizqBWZNPKsJ9odNwuml1kTx5qQ7nbuZ13DtIxvWSn4kIlA9XiotRSLZ6SksEHQezN2kkzVQqtP2Qcm00bQ4UON3F");
const prisma = new client_1.PrismaClient();
exports.cartRouter.use(express_1.default.json());
//("sk_test_51PdkvCAvBpizqBWZNPKsJ9odNwuml1kTx5qQ7nbuZ13DtIxvWSn4kIlA9XiotRSLZ6SksEHQezN2kkzVQqtP2Qcm00bQ4UON3F")
// const pincodeData: Record<string, [string, string]> = JSON.parse(
//     fs.readFileSync(path.join(__dirname, '..', '..', 'src', 'v1', 'routes', 'pincodeData.json'), 'utf8')
// );
exports.cartRouter.get('/getcart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authenticatedUser = req;
    if (!authenticatedUser)
        return res.status(400).json({ message: "The user is not authenticated!" });
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const cartItems = yield prisma.cart.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                userId
            },
            include: {
                product: true
            }
        });
        const totalAmount = cartItems.reduce((total, item) => {
            return total + item.product.newPrice * item.quantity;
        }, 0);
        res.status(200).json({
            cartItems,
            totalAmount
        });
    }
    catch (error) {
        res.json({
            error
        });
    }
}));
exports.cartRouter.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId;
    console.log(userId, "This is the user id");
    if (!userId)
        return res.status(401).json({ message: "unauthorized!" });
    try {
        const { productId, quantity, size } = req.body;
        console.log(req.body, "THIS IS SHIT GODDY");
        const existingProduct = yield prisma.cart.findFirst({
            where: {
                productId,
                userId
            },
            include: {
                product: true
            }
        });
        if (existingProduct) {
            //  console.log(existingProduct)
            res.status(400).json({
                message: "The product already exists in the cart!",
            });
            //   console.log(updatedProduct)
        }
        else {
            const item = yield prisma.cart.create({
                data: {
                    userId,
                    productId,
                    quantity,
                    size,
                },
                include: {
                    product: true
                }
            });
            res.status(200).json({
                message: "The product added to cart!",
                item
            });
        }
    }
    catch (error) {
        res.json({
            message: "There was a error",
            error
        });
    }
}));
exports.cartRouter.put("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId;
    const cartId = (_d = req.params) === null || _d === void 0 ? void 0 : _d.id;
    if (!userId)
        return res.status(401).json({
            message: "The user is not authenticated"
        });
    try {
        const { productId, quantity, size } = req.body;
        const ifExistProductToUpdate = yield prisma.cart.findFirst({
            where: {
                productId,
                userId
            },
            include: {
                product: true
            }
        });
        if (!ifExistProductToUpdate)
            return res.json({ message: "No cart item to update!" });
        const updatedQuantityItem = yield prisma.cart.update({
            where: {
                id: cartId,
                userId
            },
            data: {
                productId,
                quantity,
                size
            }
        });
        //  console.log(updatedQuantityItem)
        res.status(200).json({
            message: "Cart quantity updated successfully!",
            updatedQuantityItem
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            message: "There was a error",
            error
        });
    }
}));
exports.cartRouter.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e.userId;
    const cartId = (_f = req.params) === null || _f === void 0 ? void 0 : _f.id;
    try {
        const existingCart = yield prisma.cart.findUnique({
            where: {
                id: cartId,
                userId
            }
        });
        if (!existingCart) {
            return res.status(404).json({ message: "The cart doesn't exist!" });
        }
        yield prisma.cart.delete({
            where: {
                id: cartId,
                userId
            }
        });
        if (!cartId)
            return res.json({ msg: "The cart doesn't exist!!!" });
        res.status(200).json({
            message: "The cart has been deleted!"
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            message: "There was a error",
            error
        });
    }
}));
exports.cartRouter.delete("/deleteall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const userId = (_g = req.user) === null || _g === void 0 ? void 0 : _g.userId;
    try {
        yield prisma.cart.deleteMany({
            where: {
                userId
            }
        });
        res.status(200).json({
            message: "The complete cart has been deleted"
        });
    }
    catch (error) {
        res.json({
            message: "There was a error",
            error
        });
    }
}));
exports.cartRouter.post("/create-checkout-session", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = req.body.products;
    try {
        const lineItems = products.map((item) => ({
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
        const totalAmount = lineItems.reduce((total, item) => {
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
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173',
        });
        res.json({ sessionId: session.id });
    }
    catch (error) {
        console.error("Stripe session error:", error);
        res.status(500).send("Error creating session");
    }
}));
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
