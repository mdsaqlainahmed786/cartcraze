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
exports.orderRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const paymentMiddleware_1 = require("./middlewares/paymentMiddleware");
const nodemailer_1 = __importDefault(require("nodemailer"));
const authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
exports.orderRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
exports.orderRouter.use(express_1.default.json());
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS // Your App password
    }
});
exports.orderRouter.post('/update-payment-status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, paymentStatus, receipt } = req.body;
    console.log(req.body, "THIS IS DSMNN REQUEST BODY");
    if (!userId || !paymentStatus) {
        return res.status(400).json({ error: 'Missing userId or paymentStatus' });
    }
    try {
        const updatedUser = yield prisma.user.update({
            where: { id: userId },
            data: { paymentSession: true },
        });
        const user = yield prisma.user.findUnique({
            where: { id: userId },
        });
        console.log("Payment receipt:", receipt);
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     host: 'smtp.gmail.com',
        //     port: 587,
        //     secure: false,
        //     auth: {
        //         user: process.env.EMAIL_USER,  // Your Gmail address
        //         pass: process.env.EMAIL_PASS   // Your App password
        //     }
        // });
        // const mailOptions = {
        //     from: {
        //         name: 'CartCraze',
        //         address: process.env.EMAIL_USER
        //     }, // Sender address
        //     to: user?.email, // List of receivers
        //     subject: 'Payment Receipt', // Subject line
        //     text: `Click on the link to view your order receipt.Thank you for shopping with us!`, // Plain text body
        //     html: `<p>View your order receipt here: <a href="${receipt}">Go to receipt</a></p>`, // HTML body
        // };
        // const sendMail = async (transporter: any, mailOptions: any) => {
        //     try {
        //         await transporter.sendMail(mailOptions);
        //     } catch (error) {
        //         console.error('Error sending email:', error);
        //     }
        // }
        // sendMail(transporter, mailOptions)
        res.status(200).json({ message: 'Payment status updated successfully and the mail has been sent!', user: updatedUser });
    }
    catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.orderRouter.use(authMiddleware_1.default);
exports.orderRouter.get("/getorders", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId)
        return res.status(401).json({ message: "unauthorized!" });
    try {
        const orders = yield prisma.order.findMany({
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
        const totalAmount = orders.reduce((total, item) => {
            return total + item.product.newPrice * item.quantity;
        }, 0);
        res.status(200).json({ orders, totalAmount });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.orderRouter.post("/add", paymentMiddleware_1.paymentMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId;
    if (!userId)
        return res.status(401).json({ message: "unauthorized!" });
    try {
        const cartItems = yield prisma.cart.findMany({
            where: { userId },
            include: { product: true },
        });
        if (!cartItems.length) {
            return res.status(400).json({ message: "No items in the cart" });
        }
        const user = yield prisma.user.findUnique({
            where: { id: userId },
        });
        //   //  console.log(user?.paymentSession);  false
        //     if (!user?.paymentSession) {
        //         return res.status(400).json({ message: "Please pay to proceed" });
        //     }
        const orders = yield prisma.$transaction(cartItems === null || cartItems === void 0 ? void 0 : cartItems.map((item) => prisma.order.create({
            data: {
                userId,
                productId: item.productId,
                size: item.size,
                quantity: item.quantity,
            },
        })));
        // Reset the payment session to false after placing the order
        yield prisma.user.update({
            where: { id: userId },
            data: { paymentSession: false },
        });
        yield prisma.cart.deleteMany({
            where: { userId },
        });
        res.status(200).json({ message: "Order placed successfully!", orders });
    }
    catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
