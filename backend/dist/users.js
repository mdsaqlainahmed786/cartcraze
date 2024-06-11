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
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.userRouter = express_1.default.Router();
exports.userRouter.use((0, cookie_parser_1.default)());
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
const userSignupInput = zod_1.default.object({
    username: zod_1.default.string().max(20),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8)
});
const userSigninInput = zod_1.default.object({
    email: zod_1.default.string().email(),
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
        const user = yield prisma.user.create({
            data: {
                username,
                email,
                password
            }
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET);
        res.cookie("Secret_Auth_token", token);
        res.send("signed Up!");
        // res.status(200).json({
        //     message: "The user has been successfully created!",
        //     user,
        //     token
        // });
    }
    catch (error) {
        res.status(400).json({
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
        if (password !== user.password) {
            return res.status(400).json({ message: "The user has an incorrect password!" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET);
        // console.log(token)
        res.cookie("Secret_Auth_token", token);
        res.status(200).json({
            message: "The user has been successfully found!",
            UserId: user.id,
            token
        });
    }
    catch (error) {
        res.status(400).json({
            error
        });
    }
}));
