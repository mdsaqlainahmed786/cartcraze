"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
exports.cartRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
exports.cartRouter.use(express_1.default.json());
