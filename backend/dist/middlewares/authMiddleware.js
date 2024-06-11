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
const dotenv_1 = __importDefault(require("dotenv"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationHeader = req.headers.authorization;
    dotenv_1.default.config();
    if (!authorizationHeader)
        return res.status(404).json({ message: "Token is not provided!" });
    //const [token] = req.header.authorization?.split(" ") as string;
    // try {
    //     const decodedToken = jwt.verify(token, process.env.JWT_SCERET as string);
    //     // You can attach the decoded token to the request object for further use if needed
    //     req.decodedToken = decodedToken;
    //     console.log(decodedToken);
    //     next();
    // } catch (error) {
    //     // Token verification failed
    //     return res.status(401).json({ message: "Invalid token!" });
    // }
});
exports.default = authMiddleware;
