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
exports.sendMail = exports.userRouter = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const zod_1 = __importDefault(require("zod"));
const authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
exports.userRouter = express_1.default.Router();
const forgotPasswordLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1, // Limit each IP to 1 request per windowMs
    message: "Too many request. Please try again later.",
    headers: true, // Send rate limit info in response headers
});
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS // Your App password
    }
});
const sendMail = (to, subject, text, html) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: to, // List of receivers
        subject: subject, // Subject line
        text: text, // Plain text body
        html: html // HTML body
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
});
exports.sendMail = sendMail;
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
const userSignupInput = zod_1.default.object({
    username: zod_1.default.string().min(3).max(20),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8)
});
const userSigninInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8)
});
const resetPasswordInput = zod_1.default.object({
    password: zod_1.default.string().min(8)
});
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyParser = userSignupInput.safeParse(req.body);
    if (!bodyParser.success) {
        return res.status(400).json({ error: "There was an error", issues: bodyParser.error.issues });
    }
    const { username, email, password } = bodyParser.data;
    try {
        const checkUser = yield prisma.user.findUnique({ where: { email } });
        if (checkUser)
            return res.status(400).json({ message: "User already exists" });
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: { username, email, password: hashedPassword }
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2m' });
        const verificationLink = `https://cartcraze.vercel.app/verify/${token}`;
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail address
                pass: process.env.EMAIL_PASS // Your App password
            }
        });
        const mailOptions = {
            from: {
                name: 'CartCraze',
                address: process.env.EMAIL_USER
            }, // Sender address
            to: email, // List of receivers
            subject: 'Verify your email', // Subject line
            text: `Please verify your email by clicking the following link: ${verificationLink}`, // Plain text body
            html: `<p>Please verify your email by clicking the following link: <a href="${verificationLink}">Verify Email</a></p>`, // HTML body
        };
        const sendMail = (transporter, mailOptions) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield transporter.sendMail(mailOptions);
            }
            catch (error) {
                console.error('Error sending email:', error);
            }
        });
        sendMail(transporter, mailOptions);
        res.status(200).json({ message: "The verification link has been sent to mail!", token });
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const userCheck = yield prisma.user.findFirst({ where: { id: user.id } });
            if (!userCheck || !userCheck.isVerified) {
                yield prisma.user.delete({ where: { id: user.id } });
            }
        }), 2 * 60 * 1000); // 2 minutes timer
    }
    catch (error) {
        res.status(400).json({ error });
    }
}));
exports.userRouter.get("/verify/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.params) === null || _a === void 0 ? void 0 : _a.token;
    if (!token)
        return res.status(404).json({
            message: "No token found!"
        });
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        yield prisma.user.update({
            where: {
                id: decodedToken.userId
            },
            data: {
                isVerified: true
            }
        });
        const newToken = jsonwebtoken_1.default.sign({ userId: decodedToken.userId, email: decodedToken.email, isVerified: true, paymentSession: decodedToken.paymentSession }, process.env.JWT_SECRET);
        // console.log(newToken)
        res.clearCookie("Secret_Auth_token");
        res.cookie("Secret_Auth_token", newToken, {
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 7
        });
        const userName = yield prisma.user.findUnique({
            where: {
                email: decodedToken.email
            }
        });
        res.status(200).json({
            newToken,
            userName
        });
    }
    catch (error) {
        console.log(error, "THIS IS LOGIN ERROR");
        res.status(400).json({
            message: "Invalid token or token expired!",
            error
        });
    }
}));
exports.userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyParser = userSigninInput.safeParse(req.body);
    if (!bodyParser.success) {
        return res.status(400).json({ error: "Invalid credentials", issues: bodyParser.error.issues });
    }
    const { email, password } = bodyParser.data;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(404).json({ message: "The user has not been found!" });
        }
        const isPasswordCheck = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordCheck) {
            return res.status(400).json({ message: "The user has an incorrect password!" });
        }
        if (!user.isVerified)
            return res.status(401).json({ message: "Please verify your account!" });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, isVerified: user.isVerified, paymentSession: user.paymentSession }, process.env.JWT_SECRET);
        res.cookie("Secret_Auth_token", token, {
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 7
        });
        res.status(200).json({
            message: "The user has been successfully found!",
            UserId: user.id,
            token,
            username: user.username,
            userEmail: user.email
        });
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
}));
exports.userRouter.post('/forgot_password', forgotPasswordLimiter, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const userToResetPassword = yield prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!userToResetPassword || !userToResetPassword.isVerified) {
            return res.status(404).json({ message: "No user found with that email or not authorized yet!" });
        }
        const resetPasswordToken = jsonwebtoken_1.default.sign({ userId: userToResetPassword.id, email: userToResetPassword.email }, process.env.JWT_SECRET, { expiresIn: '3m' });
        const verificationLink = `https://cartcraze.vercel.app/reset_password/${resetPasswordToken}`;
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail address
                pass: process.env.EMAIL_PASS // Your App password
            }
        });
        const mailOptions = {
            from: {
                name: 'CartCraze',
                address: process.env.EMAIL_USER
            }, // Sender address
            to: email, // List of receivers
            subject: 'Verify your email', // Subject line
            text: `Please verify your email to reset your password by clicking the following link, will expire in 3 minutes: ${verificationLink}`, // Plain text body
            html: `<strong>Please verify your email to reset your password by clicking the following link, will expire in 3 minutes: <a href="${verificationLink}">Verify Email</a></strong>`, // HTML body
        };
        const sendMail = (transporter, mailOptions) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield transporter.sendMail(mailOptions);
            }
            catch (error) {
                console.error('Error sending email:', error);
            }
        });
        sendMail(transporter, mailOptions);
        // const mail = {
        //     to: email,
        //     from: 'cartcrazeofficial786@gmail.com',
        //     subject: 'Reset your password',
        //     text: `Please verify your email to reset your password by clicking the following link, will expire in 3 minutes: ${verificationLink}`,
        //     html: `<strong>Please verify your email to reset your password by clicking the following link, will expire in 3 minutes: <a href="${verificationLink}">Verify Email</a></strong>`,
        // };
        // sgMail.send(mail)
        //     .then(() => {
        //         res.status(200).json({ message: "The reset email verification has been sent to your mail!", resetPasswordToken });
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         res.status(400).json({ message: "Error sending email. Try again later.", error });
        //     });
        res.status(200).json({ message: "The verification link has been sent to mail!" });
    }
    catch (err) {
        res.status(400).json({ message: "There was an error or the token is expired/invalid. Try again later.", err });
    }
}));
exports.userRouter.post("/reset_password/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = (_b = req.params) === null || _b === void 0 ? void 0 : _b.token;
    if (!token)
        return res.status(404).json({ message: "No token found" });
    const bodyParser = resetPasswordInput.safeParse(req.body);
    if (!bodyParser.success)
        return res.status(400).json({
            message: "Invalid input, password must contain at least 8 characters"
        });
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decodedToken)
            return res.status(400).json({ message: "token is invalid" });
        const { password } = bodyParser.data;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const userResetPassword = yield prisma.user.update({
            where: {
                id: decodedToken.userId
            },
            data: {
                password: hashedPassword
            }
        });
        //console.log(userResetPassword)
        res.status(200).json({
            message: "The password has been successfully reset",
            userResetPassword
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Session expired, please try again later",
            error
        });
    }
}));
exports.userRouter.get('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const token = (_c = req.cookies) === null || _c === void 0 ? void 0 : _c.Secret_Auth_token;
    if (!token) {
        return res.status(200).json({
            message: "No token found!"
        });
    }
    // Clear the cookie with matching options
    res.clearCookie("Secret_Auth_token", {
        secure: true, // Same as when the cookie was set
        sameSite: 'none', // Same as when the cookie was set
        path: '/', // Default path should match where the cookie was set
    });
    res.status(200).json({
        message: "Logout successful betch"
    });
}));
exports.userRouter.put("/delivery", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { address, District, state, pincode, phoneNumber } = req.body;
    try {
        const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.userId;
        const user = yield prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user)
            return res.status(404).json({ message: "No user found" });
        const delivery = yield prisma.user.update({
            where: {
                id: userId
            },
            data: {
                address: address,
                District: District,
                state: state,
                pincode: pincode,
                phoneNumber: phoneNumber
            },
        });
        res.status(200).json({
            message: "Delivery address added successfully",
            delivery
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            error
        });
    }
}));
exports.userRouter.get("/getuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const token = (_e = req.cookies) === null || _e === void 0 ? void 0 : _e.Secret_Auth_token;
        if (!token) {
            return res.status(200).json({
                message: "No token found!"
            });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).json({
                message: "Invalid token!"
            });
        }
        const userObj = yield prisma.user.findUnique({
            where: {
                id: decodedToken.userId
            }
        });
        if (!userObj) {
            return res.status(404).json({
                message: "User not found!"
            });
        }
        res.status(200).json({
            userName: userObj.username,
            userEmail: userObj.email,
            userAddress: userObj.address,
            userDistrict: userObj.District,
            userState: userObj.state,
            userPincode: userObj.pincode,
            userPhoneNumber: userObj.phoneNumber,
            userPaymentSession: userObj.paymentSession
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
