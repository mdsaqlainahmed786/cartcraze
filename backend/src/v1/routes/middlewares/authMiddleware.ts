import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        email: string;
        isVerified: boolean;
    };
}
const authMiddleware = async (req:AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.Secret_Auth_token
    if (!token) return res.status(401).json({
        message: "No token found!"
    })
     try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
   // 
    req.user = {
        userId:decodedToken.userId,
        email:decodedToken.email,
        isVerified:decodedToken.isVerified
    }
   // console.log(decodedToken)
    if(!req.user.isVerified) return res.status(401).json({message:"Please login to add in cart"})
    next()
    } catch (err) {
        res.status(400).json({
            error:err
        })
    }

};

export default authMiddleware;
