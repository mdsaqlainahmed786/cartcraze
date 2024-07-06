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
exports.userRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.userRouter = express_1.default.Router();
exports.userRouter.use((0, cookie_parser_1.default)());
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
exports.userRouter.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173"
}));
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
exports.userRouter.use(express_1.default.json());
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyParser = userSignupInput.safeParse(req.body);
    if (!bodyParser.success) {
        return res.status(400).json({ error: "There was an error", issues: bodyParser.error.issues });
    }
    const { username, email, password } = bodyParser.data;
    try {
        const checkUser = yield prisma.user.findUnique({
            where: {
                email
            }
        });
        if (checkUser)
            return res.status(400).json({ message: "User already exists" });
    }
    catch (err) {
        console.log(err);
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2m' });
        //res.cookie("Secret_Auth_token", token)
        //res.send("signed Up!")
        const verificationLink = `http://localhost:5173/verify/${token}`;
        const mail = {
            to: email,
            from: 'cartcrazeofficial786@gmail.com',
            subject: 'Verify your email',
            text: `Please verify your email by clicking the following link, will expire in 2 minutes: ${verificationLink}`,
            html: `<strong>Please verify your email by clicking the following link, will expire in 2 minutes: <a href="${verificationLink}">Verify Email</a></strong>`,
        };
        yield mail_1.default.send(mail);
        res.status(200).json({
            message: "The verification link has been sent to mail!",
            token,
        });
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const userCheck = yield prisma.user.findFirst({
                where: {
                    id: user.id
                }
            });
            if (!userCheck || !userCheck.isVerified) {
                yield prisma.user.delete({
                    where: {
                        id: user.id
                    }
                });
                // res.clearCookie("Secret_Auth_token");
            }
        }), 2 * 60 * 1000); //3 * 60 * 1000
    }
    catch (error) {
        res.status(400).json({
            error
        });
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
        const newToken = jsonwebtoken_1.default.sign({ userId: decodedToken.userId, email: decodedToken.email, isVerified: true }, process.env.JWT_SECRET);
        // console.log(newToken)
        res.clearCookie("Secret_Auth_token");
        res.cookie("Secret_Auth_token", newToken);
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
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, isVerified: user.isVerified }, process.env.JWT_SECRET);
        // console.log(token)
        res.cookie("Secret_Auth_token", token);
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
exports.userRouter.post('/forgot_password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const verificationLink = `http://localhost:5173/reset_password/${resetPasswordToken}`;
        const mail = {
            to: email,
            from: 'cartcrazeofficial786@gmail.com',
            subject: 'Reset your password',
            text: `Please verify your email to reset your password by clicking the following link, will expire in 3 minutes: ${verificationLink}`,
            html: `<strong>Please verify your email to reset your password by clicking the following link, will expire in 3 minutes: <a href="${verificationLink}">Verify Email</a></strong>`,
        };
        mail_1.default.send(mail)
            .then(() => {
            res.status(200).json({ message: "The reset email verification has been sent to your mail!", resetPasswordToken });
        })
            .catch((error) => {
            console.error(error);
            res.status(400).json({ message: "Error sending email. Try again later.", error });
        });
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
    res.clearCookie("Secret_Auth_token");
    res.status(200).json({
        message: "logout successful"
    });
}));
