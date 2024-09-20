import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express"; import z from "zod";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt"
import axios from "axios"
import crypto from "crypto"
import rateLimit from 'express-rate-limit';
import cors from "cors"
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"
import path from "path"
import authMiddleware from "./middlewares/authMiddleware";
export const userRouter = express.Router();
userRouter.use(cookieParser())
userRouter.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
interface AuthenticatedRequest extends Request {
    user?: {
        userId: string,
        email: string
    }
}
const forgotPasswordLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1, // Limit each IP to 1 request per windowMs
    message: "Too many request. Please try again later.",
    headers: true, // Send rate limit info in response headers
  });
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Your Gmail address
        pass: process.env.EMAIL_PASS   // Your App password
    }
});
export const sendMail = async (to: string, subject: string, text: string, html: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender address
        to: to,                        // List of receivers
        subject: subject,              // Subject line
        text: text,                    // Plain text body
        html: html                     // HTML body
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
const prisma = new PrismaClient();
dotenv.config();
const userSignupInput = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8)
});

const userSigninInput = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});
const resetPasswordInput = z.object({
    password: z.string().min(8)
});
userRouter.use(express.json());

userRouter.post("/signup", async (req: Request, res: Response) => {
    const bodyParser = userSignupInput.safeParse(req.body);
    if (!bodyParser.success) {
        return res.status(400).json({ error: "There was an error", issues: bodyParser.error.issues });
    }

    const { username, email, password } = bodyParser.data;
    try {
        const checkUser = await prisma.user.findUnique({ where: { email } });
        if (checkUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { username, email, password: hashedPassword }
        });

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '2m' });
        const verificationLink = `http://localhost:5173/verify/${token}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,  // Your Gmail address
                pass: process.env.EMAIL_PASS   // Your App password
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

        const sendMail = async (transporter: any, mailOptions: any) => {
            try {
                await transporter.sendMail(mailOptions);
            } catch (error) {
                console.error('Error sending email:', error);
            }
        }
        sendMail(transporter, mailOptions)
        res.status(200).json({ message: "The verification link has been sent to mail!", token });

        setTimeout(async () => {
            const userCheck = await prisma.user.findFirst({ where: { id: user.id } });
            if (!userCheck || !userCheck.isVerified) {
                await prisma.user.delete({ where: { id: user.id } });
            }
        }, 2 * 60 * 1000); // 2 minutes timer

    } catch (error) {
        res.status(400).json({ error });
    }
});


userRouter.get("/verify/:token", async (req: Request, res: Response) => {
    const token = req.params?.token as string
    if (!token) return res.status(404).json({
        message: "No token found!"
    })
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
        await prisma.user.update({
            where: {
                id: decodedToken.userId
            },
            data: {
                isVerified: true
            }
        })
        const newToken = jwt.sign(
            { userId: decodedToken.userId, email: decodedToken.email, isVerified: true, paymentSession: decodedToken.paymentSession },
            process.env.JWT_SECRET as string
        );
        // console.log(newToken)

        res.clearCookie("Secret_Auth_token");
        res.cookie("Secret_Auth_token", newToken, { httpOnly: true, secure: true, sameSite: "none" });

        const userName = await prisma.user.findUnique({
            where: {
                email: decodedToken.email
            }
        })
        res.status(200).json({
            newToken,
            userName
        })
    } catch (error) {
        res.status(400).json({
            message: "Invalid token or token expired!",
            error
        });
    }
})

userRouter.post("/signin", async (req: Request, res: Response) => {
    const bodyParser = userSigninInput.safeParse(req.body);
    if (!bodyParser.success) {
        return res.status(400).json({ error: "Invalid credentials", issues: bodyParser.error.issues });
    }
    const { email, password } = bodyParser.data;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(404).json({ message: "The user has not been found!" });
        }
        const isPasswordCheck = await bcrypt.compare(password, user.password)
        if (!isPasswordCheck) {
            return res.status(400).json({ message: "The user has an incorrect password!" });
        }
        if (!user.isVerified) return res.status(401).json({ message: "Please verify your account!" })
        const token = jwt.sign({ userId: user.id, email: user.email, isVerified: user.isVerified, paymentSession: user.paymentSession }, process.env.JWT_SECRET as string)
        // console.log(token)
        res.cookie("Secret_Auth_token", token, { httpOnly: true, secure: true, sameSite: "none" });
        res.status(200).json({
            message: "The user has been successfully found!",
            UserId: user.id,
            token,
            username: user.username,
            userEmail: user.email

        });
    } catch (error) {
        res.status(400).json({
            error
        });
    }
});

userRouter.post('/forgot_password', forgotPasswordLimiter, async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const userToResetPassword = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!userToResetPassword || !userToResetPassword.isVerified) {
            return res.status(404).json({ message: "No user found with that email or not authorized yet!" });
        }

        const resetPasswordToken = jwt.sign({ userId: userToResetPassword.id, email: userToResetPassword.email }, process.env.JWT_SECRET as string, { expiresIn: '3m' });
        const verificationLink = `http://localhost:5173/reset_password/${resetPasswordToken}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,  // Your Gmail address
                pass: process.env.EMAIL_PASS   // Your App password
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

        const sendMail = async (transporter: any, mailOptions: any) => {
            try {
                await transporter.sendMail(mailOptions);
            } catch (error) {
                console.error('Error sending email:', error);
            }
        }
        sendMail(transporter, mailOptions)
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
    } catch (err) {
        res.status(400).json({ message: "There was an error or the token is expired/invalid. Try again later.", err });
    }
});

userRouter.post("/reset_password/:token", async (req: Request, res: Response) => {
    const token = req.params?.token
    if (!token) return res.status(404).json({ message: "No token found" })
    const bodyParser = resetPasswordInput.safeParse(req.body)
    if (!bodyParser.success) return res.status(400).json({
        message: "Invalid input, password must contain at least 8 characters"
    })
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
        if (!decodedToken) return res.status(400).json({ message: "token is invalid" })
        const { password } = bodyParser.data!
        const hashedPassword = await bcrypt.hash(password, 10)

        const userResetPassword = await prisma.user.update({
            where: {
                id: decodedToken.userId
            },
            data: {
                password: hashedPassword
            }
        })
        //console.log(userResetPassword)
        res.status(200).json({
            message: "The password has been successfully reset",
            userResetPassword
        })
    } catch (error) {
        res.status(400).json({
            message: "Session expired, please try again later",
            error
        })
    }
})

userRouter.get('/logout', async (req: Request, res: Response) => {
    res.clearCookie("Secret_Auth_token")
    res.status(200).json({
        message: "logout successful"
    })
})

userRouter.put("/delivery", authMiddleware, async (req: AuthenticatedRequest, res: Response) => {

    const { address, District, state, pincode, phoneNumber } = req.body;
    try {
        const userId = req.user?.userId
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!user) return res.status(404).json({ message: "No user found" })
        const delivery = await prisma.user.update({
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
        })
        res.status(200).json({
            message: "Delivery address added successfully",
            delivery
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error
        })
    }
})

userRouter.get("/getuser", async (req, res) => {
    try {
        const token = req.cookies?.Secret_Auth_token;

        if (!token) {
            return res.status(200).json({
                message: "No token found!"
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        if (!decodedToken) {
            return res.status(401).json({
                message: "Invalid token!"
            });
        }

        const userObj = await prisma.user.findUnique({
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

