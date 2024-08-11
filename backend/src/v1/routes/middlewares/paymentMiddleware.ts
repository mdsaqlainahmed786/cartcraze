import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        email: string;
        isVerified: boolean;
    };
}

export const paymentMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.Secret_Auth_token;
    if (!token) return res.status(401).json({ message: "No token found!" });

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        req.user = {
            userId: decodedToken.userId,
            email: decodedToken.email,
            isVerified: decodedToken.isVerified,
        };

        if (!req.user.isVerified) return res.status(401).json({ message: "Unauthorized" });

        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: { paymentSession: true },
        });
        console.log(user?.paymentSession);

        if (!user) {
            return res.status(401).json({ message: "Please pay to proceed" });
        }

        next();
    } catch (err) {
        res.status(400).json({ error: err });
    }
};
